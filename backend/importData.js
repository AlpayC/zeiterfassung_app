import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import User from "./user/UserModel.js";
import TimeTracking from "./timeTracking/TimeTrackingModel.js";

try {
  await mongoose.connect(process.env.DB);
  const user = await User.findOne({ email: "alpaycelik@web.de" });
  const jsonTimes = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const timeEntries = jsonTimes.map((time) => {
    return { ...time, createdBy: user._id };
  });
  await TimeTracking.deleteMany({ createdBy: user._id });
  await TimeTracking.create(timeEntries);
  console.log("Erfolgreich!!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
