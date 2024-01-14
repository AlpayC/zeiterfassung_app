import mongoose from "mongoose";

const timeTrackingSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const TimeTracking = mongoose.model("TimeTracking", timeTrackingSchema);
