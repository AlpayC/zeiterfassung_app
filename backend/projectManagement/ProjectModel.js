import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  tags: [{ type: String }],
});

export const Project = mongoose.model("Project", projectSchema);
export default Project;
