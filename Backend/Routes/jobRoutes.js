import express from "express";
import {
  createJob,
  fetchJobs,
  changeJobStatus,
  applyJob,
} from "../modules/jobs/jobController.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", fetchJobs);
router.put("/:id", changeJobStatus);
router.post("/:id/apply", applyJob);

export default router;