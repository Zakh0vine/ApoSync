import express from "express";
import {
  getAllProduk,
  getProdukById,
  createProduk,
  updateProduk,
  deleteProduk,
} from "../controllers/productController.js";

import { authAny, authKaryawan } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Semua bisa akses lihat produk (jika kamu ingin publik bisa lihat)
router.get("/", authAny, getAllProduk);
router.get("/:id", authAny, getProdukById);

// Produk masuk, update, delete → hanya KARYAWAN
router.post("/", authKaryawan, createProduk);
router.put("/:id", authKaryawan, updateProduk);
router.delete("/:id", authKaryawan, deleteProduk);

export default router;
