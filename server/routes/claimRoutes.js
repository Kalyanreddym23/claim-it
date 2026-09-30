import { Router } from "express";

import {
  createClaim,
  getMyClaims,
  getReceivedClaims,
  updateClaimStatus,
} from "../controllers/claimController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

export const claimRouter = Router();

claimRouter.use(requireAuth);
claimRouter.post("/", createClaim);
claimRouter.get("/mine", getMyClaims);
claimRouter.get("/received", getReceivedClaims);
claimRouter.patch("/:id", updateClaimStatus);
