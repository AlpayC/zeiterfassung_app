import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  color: { type: String, required: true },
  icon: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Project = mongoose.model("Project", projectSchema);
export default Project;
