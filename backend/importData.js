import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(path.resolve(), "..", ".env"),
});

import User from "./user/UserModel.js";
import TimeTracking from "./timeTracking/TimeTrackingModel.js";
console.log("DB Connection URI:", process.env.DB);

try {
  await mongoose.connect(process.env.DB);
  const jsonTimes = JSON.parse(
    await readFile(new URL("./lib/mockData.json", import.meta.url))
  );

  for (const time of jsonTimes) {
    let user;
    const userById = await User.findById(time.employee);
    const userByEmail = await User.findOne({ email: time.email });
    if (userById && userByEmail) {
      user = userById;
    } else if (userById) {
      user = userById;
    } else if (userByEmail) {
      user = userByEmail;
    } else {
      console.log(
        "Weder ID noch E-Mail gefunden.Bitte überprüfe die Emailadresse oder die ID"
      );
    }

    if (user) {
      console.log("User gefunden! Lege den Eintrag in der Datenbank an");
      const existingEntry = await TimeTracking.findOne({
        date: time.date,
      });

      if (!existingEntry) {
        const newTimeEntry = {
          employee: user._id,
          date: time.date,
          startTimes: time.startTimes,
          endTimes: time.endTimes,
          createdAt: time.createdAt,
        };

        const createdEntry = await TimeTracking.create(newTimeEntry);
        console.log(`Eintrag mit der id ${createdEntry._id} angelegt!`);
      } else {
        console.log("Eintrag bereits vorhanden!");
      }
    } else {
      console.log("Mitarbeiter oder E-Mail nicht gefunden!");
    }
  }

  console.log("Import abgeschlossen!!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
