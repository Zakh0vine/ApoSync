import express from "express";
import {
  tambahProdukKeluar,
  getStokByProduk,
} from "../controllers/productKeluarController.js";
import { authKaryawan } from "../middlewares/roleMiddleware.js";

const router = express.Router();
router.post("/", authKaryawan, tambahProdukKeluar);
router.get("/:id/stok", authKaryawan, getStokByProduk);
export default router;
