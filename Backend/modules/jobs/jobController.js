import { addJob, getJobs, updateJobStatus } from "./jobService.js";

import { openJobPage } from "../../services/puppeteerService.js";

// 🔹 Apply for job

export const applyJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    await openJobPage(job.url);


    job.status = "applied";
    await job.save();

    res.json({
      message: "Job opened for applying",
      job,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Apply failed" });
  }
};

// 🔹 Add Job API
export const createJob = async (req, res) => {
  const { title, company, url } = req.body;

  if (!title || !company || !url) {
    return res.status(400).json({ error: "All fields required" });
  }

  const job = await addJob({ title, company, url });
  res.status(201).json(job);
};

// 🔹 Get Jobs API
export const fetchJobs = async (req, res) => {
  try {
    const jobs = await getJobs();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// 🔹 Update Status API
export const changeJobStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await updateJobStatus(id, status);

    if (!updated) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
};