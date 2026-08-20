import express from "express";
import { openJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/open", openJob);

export default router;