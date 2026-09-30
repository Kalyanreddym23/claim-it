import jwt from "jsonwebtoken";

import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const requireAuth = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization || "";

  if (!authorization.startsWith("Bearer ")) {
    const error = new Error("Authentication is required.");
    error.statusCode = 401;
    throw error;
  }

  const token = authorization.slice(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      const error = new Error("Your account no longer exists.");
      error.statusCode = 401;
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const authError = new Error("Your session is invalid or has expired.");
    authError.statusCode = 401;
    throw authError;
  }
});
