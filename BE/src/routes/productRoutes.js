// const express = require("express");
// const router = express.Router();
// const productController = require("../controllers/productController");

// // Route untuk menambah produk baru
// router.post("/products", productController.createProduct);

// // Route untuk mendapatkan semua produk
// router.get("/products", productController.getAllProducts);

// module.exports = router;

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Import middleware role terpusat
const { authKaryawan, authAny } = require("../middlewares/roleMiddleware");

// Route untuk mendapatkan semua produk
router.get("/product", authAny, productController.getAllProducts);

// Route untuk mendapatkan satu produk dengan detail batch-nya
router.get("/product/:id", authAny, productController.getProductById);

// Route untuk mendapatkan batches untuk popup (ketika nama produk diklik)
router.get(
  "/product/:productId/batches",
  authAny,
  productController.getProductBatches
);

// Route untuk menambah produk baru
router.post("/product", authKaryawan, productController.createProduct);

// Route untuk update produk
router.put("/product/:id", authKaryawan, productController.updateProduct);

// Route untuk delete produk
router.delete("/product/:id", authKaryawan, productController.deleteProduct);

module.exports = router;
