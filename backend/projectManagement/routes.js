import { Router } from "express";
import multer from "multer";
import { Project } from "./ProjectModel.js";
import User from "../user/UserModel.js";
import { authenticateToken } from "../user/authToken.js";
export const projectManagementRouter = Router();

const multerMiddleware = multer();
projectManagementRouter.get("/", async (req, res) => {
  res.send("Project management ok");
});
projectManagementRouter.post(
  "/addProject",
  authenticateToken,
  async (req, res) => {
    try {
      const { email, title, color, icon } = req.body;

      console.log({ email, title, color, icon });
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(404).send("User nicht gefunden");
      }

      if (user.email !== email.toLowerCase()) {
        return res.status(403).send("Forbidden");
      }

      const existingProjectEntry = await Project.findOne({
        employee: user._id,
        title,
        color,
        icon,
      });

      if (existingProjectEntry) {
        return res.status(400).send({
          message: "Projekt nicht gespeichert",
          error: {
            message: "Projekt vorhanden",
          },
        });
      }

      const newProjectEntry = new Project({
        employee: user._id,
        title,
        color,
        icon,
      });

      await newProjectEntry.save();

      return res.status(201).send({
        message: "Projekt erfolgreich gespeichert",
        success: { message: "Füge nun Aufgaben hinzu" },
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

projectManagementRouter.get(
  "/getProjects",
  authenticateToken,
  async (req, res) => {
    console.log(req.query);
    try {
      const { email } = req.query;

      console.log({ email });
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(404).send("User nicht gefunden");
      }

      if (user.email !== email.toLowerCase()) {
        return res.status(403).send("Forbidden");
      }

      const getAllProjects = await Project.find({
        employee: user._id,
      });

      res.status(200).json(getAllProjects);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);
projectManagementRouter.delete(
  "/deleteProject/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { email, projectId } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() });
      const project = req.params.id;
      if (!user) {
        return res.status(404).send("User nicht gefunden");
      }

      if (user.email !== email.toLowerCase()) {
        return res.status(403).send("Forbidden");
      }
      if (project !== projectId) {
        return res.status(403).send("Projekt Valididerung fehlgeschlagen");
      }

      const deleteProject = await Project.findByIdAndDelete({
        employee: user._id,
        _id: projectId,
      });
      if (!deleteProject) {
        return res.status(400).send({
          message: "Projektlösung fehlgeschlagen",
          error: { message: "Kein Projekt mit diesen Daten vorhanden" },
        });
      }
      return res.status(201).send({
        message: "Projekt gelöscht",
        success: { message: "Erstelle eine neues Projekt" },
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);
projectManagementRouter.put(
  "/updateProject/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { email, title, color, icon, projectId } = req.body;
      const user = await User.findOne({ email: email.toLowerCase() });
      const project = req.params.id;
      const updatedData = {
        title: title,
        color: color,
        icon: icon,
      };

      if (!user) {
        return res.status(404).send("User nicht gefunden");
      }

      if (user.email !== email.toLowerCase()) {
        return res.status(403).send("Forbidden");
      }
      if (project !== projectId) {
        return res.status(403).send("Projekt Valididerung fehlgeschlagen");
      }

      const compareExistingProject = await Project.findById(project);

      if (
        compareExistingProject.title === updatedData.title &&
        compareExistingProject.color === updatedData.color &&
        compareExistingProject.icon === updatedData.icon
      ) {
        return res.status(200).send({
          message: "Keine Änderungen an den Projektdetails vorgenommen",
        });
      }

      await Project.findByIdAndUpdate(project, updatedData);

      return res.status(201).send({
        message: "Projektdetails upgedatet",
        success: {
          message: "Neue Projektinformationen wurden erfolgreich gespeichert",
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);
