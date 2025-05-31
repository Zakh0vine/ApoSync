// src/routes/dashboardRoutes.js

import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { authAny } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// KARYAWAN dan SUPER_ADMIN bisa lihat dashboard
router.get("/", authAny, getDashboard);

export default router;
