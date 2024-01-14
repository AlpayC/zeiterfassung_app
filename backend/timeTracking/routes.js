import { Router } from "express";
import multer from "multer";
import { TimeTracking } from "./TimeTrackingModel.js";
import User from "../user/UserModel.js";
import { startOfDay, endOfDay, parseISO } from "date-fns";

export const timeTrackingRouter = Router();

const multerMiddleware = multer();

timeTrackingRouter.get("/", async (req, res) => {
  res.send("ok");
});

//authenticateToken von der middleware hinzufügen

timeTrackingRouter.get("/getTimes", async (req, res) => {
  try {
    const { _id, startDate, endDate } = req.body;

    console.log("Received request:", { _id, startDate, endDate });

    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.id !== _id) {
      return res.status(403).send("Forbidden");
    }

    let query = {
      employee: _id,
    };

    if (startDate) {
      const startDateTime = parseISO(startDate);
      const endDateTime = endDate ? parseISO(endDate) : new Date(startDateTime);
      endDateTime.setHours(23, 59, 59, 999);
      query.date = { $gte: startDateTime, $lte: endDateTime };
    }

    console.log("Query to be executed:", query);

    const timeEntries = await TimeTracking.find(query);
    console.log("Resulting timeEntries:", timeEntries);

    timeEntries.forEach((entry) => {
      console.log("Database Entry Date (UTC):", entry.date);
    });

    res.json(timeEntries);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

timeTrackingRouter.post("/addTimes", async (req, res) => {
  try {
    const { _id, date, startTime, endTime } = req.body;

    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.id !== _id) {
      return res.status(403).send("Forbidden");
    }

    const activeStartTimeEntry = await TimeTracking.findOne({
      employee: _id,
      date,
      startTimes: { $ne: null },
      endTimes: null,
    });

    if (activeStartTimeEntry && !endTime) {
      return res.status(400).send("Active start time already exists");
    }

    const existingStartTimeEntry = await TimeTracking.findOne({
      employee: _id,
      date,
      startTimes: startTime,
    });

    if (existingStartTimeEntry) {
      return res.status(400).send("Duplicate start time entry");
    }

    const existingEndTimeEntry = await TimeTracking.findOne({
      employee: _id,
      date,
      endTimes: endTime,
    });

    if (existingEndTimeEntry) {
      return res.status(400).send("Duplicate end time entry");
    }

    const newTimeEntry = new TimeTracking({
      employee: _id,
      date,
      startTimes: startTime ? [startTime] : [],
      endTimes: endTime ? [endTime] : [],
    });

    const savedEntry = await newTimeEntry.save();

    res.status(201).json(savedEntry);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
