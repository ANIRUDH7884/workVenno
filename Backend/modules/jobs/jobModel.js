import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "applied", "interview", "rejected"],
    default: "pending",
  },
});

export default mongoose.model("Jobs", jobSchema);