import { Router } from "express";

import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  getMyItems,
  updateItem,
} from "../controllers/itemController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

export const itemRouter = Router();

itemRouter.get("/", getItems);
itemRouter.get("/mine", requireAuth, getMyItems);
itemRouter.get("/:id", getItemById);
itemRouter.post("/", requireAuth, createItem);
itemRouter.put("/:id", requireAuth, updateItem);
itemRouter.delete("/:id", requireAuth, deleteItem);
