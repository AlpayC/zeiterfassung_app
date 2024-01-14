import { Router } from "express";
import multer from "multer";
import { TimeTracking } from "./TimeTrackingModel.js";

export const timeTrackingRouter = Router();

const multerMiddleware = multer();

timeTrackingRouter.get("/", async (req, res) => {
  res.send("ok");
});

timeTrackingRouter.post;
