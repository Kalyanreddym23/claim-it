import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
      index: true,
    },
    claimant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, "Claim message cannot exceed 500 characters."],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

claimSchema.index({ item: 1, claimant: 1 }, { unique: true });

export const Claim = mongoose.model("Claim", claimSchema);
