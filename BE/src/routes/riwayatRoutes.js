import express from "express";
import { getRiwayat } from "../controllers/riwayatController.js";
import { authAny } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// GET /api/v1/riwayat
router.get("/", authAny, getRiwayat);

export default router;
