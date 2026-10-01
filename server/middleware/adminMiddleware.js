import { asyncHandler } from "../utils/asyncHandler.js";

export const requireAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    const error = new Error("Admin access is required.");
    error.statusCode = 403;
    throw error;
  }

  next();
});