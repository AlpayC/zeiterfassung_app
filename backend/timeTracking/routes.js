import { Router } from "express";
import multer from "multer";
import { TimeTracking } from "./TimeTrackingModel.js";
import User from "../user/UserModel.js";
import { parseISO } from "date-fns";
import { authenticateToken } from "../user/authToken.js";
import nodemailer from "nodemailer";
import mailgunTransport from "nodemailer-mailgun-transport";
import { mailToHrTemplate } from "../lib/mailTemplates.js";
import { formatDate, formatTime } from "../utils/formatDate.js";
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
    console.log("Zeiten:", timeEntries);

    timeEntries.forEach((entry) => {
      console.log("Datenbank Entry Datum(UTC):", entry.date);
    });

    res.json(timeEntries);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

timeTrackingRouter.post(
  "/addStartTime",
  authenticateToken,
  async (req, res) => {
    try {
      const { email, date, startTime } = req.body;
      console.log({ email, date, startTime });
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

      if (activeStartTimeEntry) {
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

      const newTimeEntry = new TimeTracking({
        employee: user._id,
        date,
        startTimes: startTime ? [startTime] : [],
      });

      const savedEntry = await newTimeEntry.save();

      res.status(201).json(savedEntry);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

timeTrackingRouter.put("/addEndTime", authenticateToken, async (req, res) => {
  try {
    const { email, date, endTime } = req.body;
    console.log({ email, date, endTime });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).send("User nicht gefunden");
    }

    if (user.email !== email.toLowerCase()) {
      return res.status(403).send("Forbidden");
    }

    const existingTimeEntry = await TimeTracking.findOne({
      employee: user._id,
      date: {
        $gte: new Date(date).setUTCHours(0, 0, 0, 0),
      },
      $or: [{ endTimes: { $eq: null } }, { endTimes: { $size: 0 } }],
    });
    if (!existingTimeEntry) {
      return res
        .status(404)
        .send("Kein Zeitverfolgungseintrag ohne Endzeit gefunden");
    }

    existingTimeEntry.endTimes.push(endTime);

    const savedEntry = await existingTimeEntry.save();

    res.status(200).json(savedEntry);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

timeTrackingRouter.post(
  "/sendEmailToHR",
  authenticateToken,
  async (req, res) => {
    try {
      const { email, date, endTime, startTime } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() });
      const hrEmail = process.env.HR_MAIL_ADRESS;

      if (!hrEmail) {
        throw new Error(
          "HR_MAIL_ADRESS ist nicht definiert in der Umgebungsvariable."
        );
      }

      const transporter = nodemailer.createTransport(
        mailgunTransport({
          auth: {
            api_key: process.env.MAILGUN_API,
            domain: process.env.MAILGUN_DOMAIN,
          },
        })
      );
      const mailOptions = {
        from: email,
        to: hrEmail,
        subject: `Zeiterfassung ${user.name}`,
        text: mailToHrTemplate({
          user: user.name,
          date: formatDate(new Date(date)),
          startTime: formatTime(new Date(startTime)),
          endTime: formatTime(new Date(endTime)),
        }),
      };
      const info = await transporter.sendMail(mailOptions);
      console.log("E-Mail wurde erfolgreich gesendet:", info.response);
      res.status(200).send("E-Mail wurde erfolgreich gesendet");
    } catch (error) {
      console.error("Fehler beim Senden der E-Mail:", error.message);
      res.status(500).send("Fehler beim Senden der E-Mail");
    }
  }
);
timeTrackingRouter.post(
  "/getTimeTrackingActivity",
  authenticateToken,
  async (req, res) => {
    try {
      const { email, date } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(404).send("User nicht gefunden");
      }

      if (user.email !== email.toLowerCase()) {
        return res.status(403).send("Forbidden");
      }

      const existingTimeEntry = await TimeTracking.findOne({
        employee: user._id,
        date: {
          $gte: new Date(date).setUTCHours(0, 0, 0, 0),
        },
        $or: [{ endTimes: { $eq: null } }, { endTimes: { $size: 0 } }],
      });
      if (!existingTimeEntry) {
        return res
          .status(204)
          .header("X-Info", "Kein Zeitverfolgungseintrag ohne Endzeit gefunden")
          .send();
      }

      res.status(200).json(existingTimeEntry);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);
