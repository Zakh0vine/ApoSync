// const express = require("express");
// const router = express.Router();
// const productBatchController = require("../controllers/productBatchController");

// // Route untuk menambah batch baru
// router.post("/product-batches", productBatchController.createProductBatch);

// // Route untuk mendapatkan semua batch produk
// router.get("/product-batches", productBatchController.getAllProductBatches);

// module.exports = router;

const express = require("express");
const router = express.Router();
const productBatchController = require("../controllers/productBatchController");

// Import middleware role terpusat
const { authKaryawan, authAny } = require("../middlewares/roleMiddleware");

// Route untuk mendapatkan semua batch produk
router.get(
  "/product-batches",
  authAny,
  productBatchController.getAllProductBatches
);

// Route untuk mendapatkan satu batch produk berdasarkan ID
router.get(
  "/product-batches/:id",
  authAny,
  productBatchController.getProductBatchById
);

// Route untuk menambah batch baru
router.post(
  "/product-batches",
  authKaryawan,
  productBatchController.createProductBatch
);

// Route untuk update batch produk
router.put(
  "/product-batches/:id",
  authKaryawan,
  productBatchController.updateProductBatch
);

// Route untuk delete batch produk
router.delete(
  "/product-batches/:id",
  authKaryawan,
  productBatchController.deleteProductBatch
);

module.exports = router;
