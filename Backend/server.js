import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";
import logger from "./utils/logger.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);

connectDB();

app.listen(5000, () => {
  logger.info("Server running on port 5000");
});