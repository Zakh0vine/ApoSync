// routes/laporanRoutes.js
import express from "express";
import {
  getLaporanPersediaan,
  getLaporanLaba,
  downloadLaporanPDF,
} from "../controllers/laporanController.js";
import { authSuperAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Ambil data tabel persediaan
// GET /api/v1/laporan/persediaan
router.get("/persediaan", authSuperAdmin, getLaporanPersediaan);

// Ambil data tabel laba (30 hari terakhir)
// GET /api/v1/laporan/laba
router.get("/laba", authSuperAdmin, getLaporanLaba);

// Download PDF laporan gabungan
// GET /api/v1/laporan/download-pdf
router.get("/download-pdf", authSuperAdmin, downloadLaporanPDF);

export default router;
