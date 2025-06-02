// src/routes/notificationRoutes.js

import express from "express";
import { getAllNotifications } from "../controllers/notificationController.js";
import { authAny } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", authAny, getAllNotifications);

export default router;
