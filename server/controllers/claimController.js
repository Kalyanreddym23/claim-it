import { Claim } from "../models/Claim.js";
import { Item } from "../models/Item.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function createHttpError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export const createClaim = asyncHandler(async (req, res) => {
  const { itemId, message } = req.body;

  if (!itemId) {
    throw createHttpError("An item is required to submit a claim.", 400);
  }

  const item = await Item.findById(itemId);
  if (!item) {
    throw createHttpError("Item not found.", 404);
  }

  if (item.status !== "active") {
    throw createHttpError("This item is no longer accepting claims.", 409);
  }

  if (item.owner.toString() === req.user._id.toString()) {
    throw createHttpError("You cannot submit a claim for your own listing.", 403);
  }

  const existingClaim = await Claim.findOne({
    item: item._id,
    claimant: req.user._id,
  });
  if (existingClaim) {
    throw createHttpError("You have already submitted a claim for this item.", 409);
  }

  const claim = await Claim.create({
    item: item._id,
    claimant: req.user._id,
    message,
  });
  await claim.populate([
    { path: "item", select: "title type location" },
    { path: "claimant", select: "name email" },
  ]);

  res.status(201).json({
    message: "Claim submitted successfully.",
    claim,
  });
});

export const getMyClaims = asyncHandler(async (req, res) => {
  const claims = await Claim.find({ claimant: req.user._id })
    .populate("item", "title type location status imageUrl")
    .sort({ createdAt: -1 });

  res.json({ claims });
});

export const getReceivedClaims = asyncHandler(async (req, res) => {
  const itemIds = await Item.find({ owner: req.user._id }).distinct("_id");
  const claims = await Claim.find({ item: { $in: itemIds } })
    .populate("item", "title type location status imageUrl")
    .populate("claimant", "name email")
    .sort({ createdAt: -1 });

  res.json({ claims });
});

export const updateClaimStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    throw createHttpError("Status must be approved or rejected.", 400);
  }

  const claim = await Claim.findById(req.params.id).populate("item", "owner status");
  if (!claim) {
    throw createHttpError("Claim not found.", 404);
  }

  if (claim.item.owner.toString() !== req.user._id.toString()) {
    throw createHttpError("Only the listing owner can update this claim.", 403);
  }

  if (claim.status !== "pending") {
    throw createHttpError("Only pending claims can be updated.", 409);
  }

  if (status === "approved") {
    const updatedItem = await Item.findOneAndUpdate(
      { _id: claim.item._id, status: "active" },
      { status: "claimed" },
      { new: true },
    );

    if (!updatedItem) {
      throw createHttpError("This item is no longer available to claim.", 409);
    }
  }

  claim.status = status;
  await claim.save();

  res.json({
    message: `Claim ${status}.`,
    claim,
  });
});
