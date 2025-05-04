const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route untuk menambah produk baru
router.post("/products", productController.createProduct);

// Route untuk mendapatkan semua produk
router.get("/products", productController.getAllProducts);

module.exports = router;
