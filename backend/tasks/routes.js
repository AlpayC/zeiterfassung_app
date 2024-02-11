import { Router } from "express";
import multer from "multer";
import { Task } from "./TaskModel.js";
import User from "../user/UserModel.js";
import { authenticateToken } from "../user/authToken.js";
import Project from "../projectManagement/ProjectModel.js";
export const taskRouter = Router();

const multerMiddleware = multer();
taskRouter.get("/", async (req, res) => {
  res.send("Task ok");
});
taskRouter.post("/addTask", authenticateToken, async (req, res) => {
  try {
    const { email, projectId, startDate, endDate, title } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).send("User nicht gefunden");
    }

    if (user.email !== email.toLowerCase()) {
      return res.status(403).send("Forbidden");
    }
    const project = await Project.findById(projectId);

    const existingTaskEntry = await Task.findOne({
      employee: user._id,
      project: project._id,
      startDate,
      endDate,
      title,
    });

    if (existingTaskEntry) {
      return res.status(400).send({
        message: "Aufgabe nicht gespeichert",
        error: {
          message:
            "Aufgabe breits vorhanden. Ändere die Aufgabendetails auf der Detailseite",
        },
      });
    }

    const newTaskEntry = new Task({
      employee: user._id,
      project: project._id,
      title,
      startDate,
      endDate,
    });

    await newTaskEntry.save();

    return res.status(201).send({
      message: "Aufgabe erfolgreich gespeichert",
      success: { message: "Füge eine weitere Aufgabe hinzu" },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

taskRouter.get("/getTasks", authenticateToken, async (req, res) => {
  try {
    const { email } = req.body;

    console.log({ email });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).send("User nicht gefunden");
    }

    if (user.email !== email.toLowerCase()) {
      return res.status(403).send("Forbidden");
    }

    const getAllTasks = await Task.find({
      employee: user._id,
    });

    res.status(200).json(getAllTasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
taskRouter.delete("/deleteTask/:id", authenticateToken, async (req, res) => {
  try {
    const { email, projectId, taskId } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    const task = req.params.id;
    if (!user) {
      return res.status(404).send("User nicht gefunden");
    }

    if (user.email !== email.toLowerCase()) {
      return res.status(403).send("Forbidden");
    }
    if (task !== taskId) {
      return res.status(403).send("Aufgaben Valididerung fehlgeschlagen");
    }
    const project = await Project.findById(projectId);

    const deleteTask = await Task.findByIdAndDelete({
      employee: user._id,
      _id: task,
      project: project._id,
    });
    if (!deleteTask) {
      return res.status(400).send({
        message: "Aufgabe nicht gelöscht",
        error: { message: "Keine Aufgabe mit diesen Daten vorhanden" },
      });
    }
    return res.status(201).send({
      message: "Aufgabe gelöscht",
      success: { message: "Erstelle eine neue Aufgabe" },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
taskRouter.put("/updateTask/:id", authenticateToken, async (req, res) => {
  try {
    const { email, title, startDate, endDate, projectId, taskId } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    const task = req.params.id;
    const updatedData = {
      title: title,
      startDate: startDate,
      endDate: endDate,
      project: projectId,
    };

    if (!user) {
      return res.status(404).send("User nicht gefunden");
    }

    if (user.email !== email.toLowerCase()) {
      return res.status(403).send("Forbidden");
    }
    if (task !== taskId) {
      return res.status(403).send("Projekt Valididerung fehlgeschlagen");
    }

    const compareExistingTask = await Task.findById(task);
    if (
      compareExistingTask.title === updatedData.title &&
      compareExistingTask.startDate.getTime() ===
        new Date(updatedData.startDate).getTime() &&
      compareExistingTask.endDate.getTime() ===
        new Date(updatedData.endDate).getTime() &&
      compareExistingTask.project.toString() === updatedData.project.toString()
    ) {
      return res.status(200).send({
        message: "Keine Änderungen an den Aufgabendetails vorgenommen",
      });
    }

    await Task.findByIdAndUpdate(task, updatedData);

    return res.status(201).send({
      message: "Aufgabe upgedatet",
      success: {
        message: "Neue Aufgabeninformationen wurden erfolgreich gespeichert",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
