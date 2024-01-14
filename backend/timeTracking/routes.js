import { Router } from "express";
import multer from "multer";
import { TimeTracking } from "./TimeTrackingModel.js";
import User from "../user/UserModel.js";
import { startOfDay, endOfDay, parseISO } from "date-fns";
import { authenticateToken } from "../user/authToken.js";
export const timeTrackingRouter = Router();

const multerMiddleware = multer();

timeTrackingRouter.get("/", async (req, res) => {
  res.send("ok");
});

timeTrackingRouter.post("/getTimes", authenticateToken, async (req, res) => {
  try {
    const { email, startDate, endDate } = req.body;

    console.log("Request erhalten:", { email, startDate, endDate });

    const user = await User.findOne({ email: email.toLowerCase() });
    console.log({ user });
    if (!user) {
      return res.status(404).send("User nicht gefunden");
    }
    if (user.email !== email.toLowerCase()) {
      return res.status(403).send("Forbidden");
    }

    let query = {
      employee: user._id,
    };

    if (startDate) {
      const startDateTime = parseISO(startDate);
      const endDateTime = endDate ? parseISO(endDate) : new Date(startDateTime);
      endDateTime.setHours(23, 59, 59, 999);
      query.date = { $gte: startDateTime, $lte: endDateTime };
    }

    console.log("Query wird mit folgenden Daten gestartet:", query);

    const timeEntries = await TimeTracking.find(query);
    console.log("Zeiteinträge:", timeEntries);

    timeEntries.forEach((entry) => {
      console.log("Datenbank Entry Datum(UTC):", entry.date);
    });

    res.json(timeEntries);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

timeTrackingRouter.post("/addTimes", authenticateToken, async (req, res) => {
  try {
    const { email, date, startTime, endTime } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).send("User nicht gefunden");
    }

    if (user.email !== email.toLowerCase()) {
      return res.status(403).send("Forbidden");
    }

    const activeStartTimeEntry = await TimeTracking.findOne({
      employee: user._id,
      date,
      startTimes: { $ne: null },
      endTimes: null,
    });

    if (activeStartTimeEntry && !endTime) {
      return res.status(400).send("Aktivität bereits gestartet");
    }

    const existingStartTimeEntry = await TimeTracking.findOne({
      employee: user._id,
      date,
      startTimes: startTime,
    });

    if (existingStartTimeEntry) {
      return res
        .status(400)
        .send("Es kann nicht eine weitere Startuhrzeit gespeichert werden");
    }

    const existingEndTimeEntry = await TimeTracking.findOne({
      employee: user._id,
      date,
      endTimes: endTime,
    });

    if (existingEndTimeEntry) {
      return res
        .status(400)
        .send("Es kann nicht eine weitere Enduhrzeit gespeichert werden");
    }

    const newTimeEntry = new TimeTracking({
      employee: user._id,
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
