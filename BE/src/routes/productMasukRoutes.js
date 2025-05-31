import express from "express";
import { tambahProdukMasuk } from "../controllers/productMasukController.js";
import { authKaryawan } from "../middlewares/roleMiddleware.js";

const router = express.Router();
router.post("/", authKaryawan, tambahProdukMasuk);
export default router;
