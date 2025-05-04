const express = require("express");
const router = express.Router();
const productBatchController = require("../controllers/productBatchController");

// Route untuk menambah batch baru
router.post("/product-batches", productBatchController.createProductBatch);

// Route untuk mendapatkan semua batch produk
router.get("/product-batches", productBatchController.getAllProductBatches);

module.exports = router;
