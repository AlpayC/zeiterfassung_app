import mongoose from "mongoose";

const initProjectStatus = [
  {
    title: "Noch nicht gestartet",
    color: "bg-red-500",
    status: true,
  },
  {
    title: "Läuft",
    color: "bg-yellow-500",
    status: false,
  },
  {
    title: "Abgeschlossen",
    color: "bg-green-500",
    status: false,
  },
  {
    title: "Geblockt",
    color: "bg-blue-500",
    status: false,
  },
];

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
  projectStatus: { type: Object, default: initProjectStatus },
  createdAt: { type: Date, default: Date.now },
  tags: [{ type: String }],
});

export const Project = mongoose.model("Project", projectSchema);
export default Project;
