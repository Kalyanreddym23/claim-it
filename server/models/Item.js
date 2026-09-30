import mongoose from "mongoose";

export const ITEM_CATEGORIES = [
  "Electronics",
  "Books & Notes",
  "Accessories",
  "ID & Documents",
  "Keys",
  "Clothing",
  "Sports",
  "Other",
];

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Item title is required."],
      trim: true,
      minlength: [3, "Title must be at least 3 characters."],
      maxlength: [120, "Title cannot exceed 120 characters."],
    },
    description: {
      type: String,
      required: [true, "Item description is required."],
      trim: true,
      minlength: [10, "Description must be at least 10 characters."],
      maxlength: [2000, "Description cannot exceed 2000 characters."],
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      enum: {
        values: ITEM_CATEGORIES,
        message: "Select a valid category.",
      },
    },
    location: {
      type: String,
      required: [true, "Location is required."],
      trim: true,
      minlength: [2, "Location must be at least 2 characters."],
      maxlength: [160, "Location cannot exceed 160 characters."],
    },
    date: {
      type: Date,
      required: [true, "Date is required."],
      validate: {
        validator: (value) => value <= new Date(),
        message: "Date cannot be in the future.",
      },
    },
    type: {
      type: String,
      required: true,
      enum: {
        values: ["lost", "found"],
        message: "Type must be either lost or found.",
      },
    },
    imageUrl: {
      type: String,
      trim: true,
      maxlength: [2048, "Image URL is too long."],
      validate: {
        validator: (value) => !value || /^https?:\/\/\S+$/i.test(value),
        message: "Image URL must start with http:// or https://.",
      },
    },
    status: {
      type: String,
      enum: ["active", "claimed", "resolved"],
      default: "active",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

itemSchema.index({ type: 1, status: 1, createdAt: -1 });
itemSchema.index({ category: 1, location: 1 });

export const Item = mongoose.model("Item", itemSchema);
