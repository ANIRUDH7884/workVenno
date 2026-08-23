import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/venoWork");

    logger.info("MongoDB Connected");
  } catch (err) {
    logger.error("DB Connection Failed: " + err.message);
    process.exit(1);
  }
};

