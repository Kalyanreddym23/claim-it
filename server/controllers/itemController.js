import { ITEM_CATEGORIES, Item } from "../models/Item.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const ITEM_FIELDS = ["title", "description", "category", "location", "date", "type", "imageUrl", "status"];
const ITEM_STATUSES = ["active", "claimed", "resolved"];

function createHttpError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function pickItemFields(body) {
  return ITEM_FIELDS.reduce((itemData, field) => {
    if (body[field] !== undefined) {
      itemData[field] = body[field];
    }
    return itemData;
  }, {});
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^\x24{}()|[\]\\]/g, "\\$&");
}

function getPagination(query) {
  const requestedPage = Number.parseInt(query.page, 10);
  const requestedLimit = Number.parseInt(query.limit, 10);

  return {
    page: Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1,
    limit:
      Number.isInteger(requestedLimit) && requestedLimit > 0
        ? Math.min(requestedLimit, 100)
        : 24,
  };
}

function assertOwner(item, userId) {
  if (item.owner.toString() !== userId.toString()) {
    throw createHttpError("You can only manage your own listings.", 403);
  }
}

export const getItems = asyncHandler(async (req, res) => {
  const { type, category, location, search, status } = req.query;
  const { page, limit } = getPagination(req.query);
  const filter = {};

  if (type) {
    if (!["lost", "found"].includes(type)) {
      throw createHttpError("Type must be either lost or found.", 400);
    }
    filter.type = type;
  }

  if (category) {
    if (!ITEM_CATEGORIES.includes(category)) {
      throw createHttpError("Select a valid category.", 400);
    }
    filter.category = category;
  }

  if (status) {
    if (!ITEM_STATUSES.includes(status)) {
      throw createHttpError("Select a valid item status.", 400);
    }
    filter.status = status;
  } else {
    filter.status = "active";
  }

  if (location?.trim()) {
    filter.location = { $regex: escapeRegExp(location.trim()), $options: "i" };
  }

  if (search?.trim()) {
    const searchPattern = { $regex: escapeRegExp(search.trim()), $options: "i" };
    filter.$or = [{ title: searchPattern }, { description: searchPattern }];
  }

  const [items, count] = await Promise.all([
    Item.find(filter)
      .populate("owner", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Item.countDocuments(filter),
  ]);

  res.json({
    items,
    pagination: {
      page,
      limit,
      totalItems: count,
      totalPages: Math.max(1, Math.ceil(count / limit)),
    },
  });
});

export const getMyItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json({ items });
});

export const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id).populate("owner", "name");

  if (!item) {
    throw createHttpError("Item not found.", 404);
  }

  res.json({ item });
});

export const createItem = asyncHandler(async (req, res) => {
  const itemData = pickItemFields(req.body);
  const item = await Item.create({ ...itemData, owner: req.user._id });

  res.status(201).json({
    message: "Listing created successfully.",
    item,
  });
});

export const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    throw createHttpError("Item not found.", 404);
  }

  assertOwner(item, req.user._id);
  Object.assign(item, pickItemFields(req.body));
  await item.save();

  res.json({
    message: "Listing updated successfully.",
    item,
  });
});

export const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    throw createHttpError("Item not found.", 404);
  }

  assertOwner(item, req.user._id);
  await item.deleteOne();

  res.status(204).send();
});
