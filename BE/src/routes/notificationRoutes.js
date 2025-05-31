// src/routes/notificationRoutes.js

import express from "express";
import { getAllNotifications } from "../controllers/notificationController.js";
import { authKaryawan } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", authKaryawan, getAllNotifications);

export default router;
