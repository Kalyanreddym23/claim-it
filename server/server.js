import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { connectDatabase } from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { authRouter } from "./routes/authRoutes.js";
import { claimRouter } from "./routes/claimRoutes.js";
import { itemRouter } from "./routes/itemRoutes.js";

dotenv.config();

const requiredEnvironment = ["MONGO_URI", "JWT_SECRET"];
const missingEnvironment = requiredEnvironment.filter((key) => !process.env[key]);

if (missingEnvironment.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvironment.join(", ")}`);
  process.exit(1);
}

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin is not allowed by CORS."));
    },
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});
app.use("/api/auth", authRouter);
app.use("/api/items", itemRouter);
app.use("/api/claims", claimRouter);

app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT) || 5000;

async function startServer() {
  await connectDatabase(process.env.MONGO_URI);
  app.listen(port, () => {
    console.info(`Claim-It API listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Unable to start Claim-It API.", error);
  process.exit(1);
});
