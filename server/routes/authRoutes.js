import { Router } from "express";

import { login, register } from "../controllers/authController.js";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
