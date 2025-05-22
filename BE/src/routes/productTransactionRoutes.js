// const express = require("express");
// const router = express.Router();
// const productTransactionController = require("../controllers/productTransactionController");

// // POST transaksi keluar
// router.post(
//   "/product-transactions/outgoing",
//   productTransactionController.createOutgoingTransaction
// );

// module.exports = router;

const express = require("express");
const router = express.Router();
const productTransactionController = require("../controllers/productTransactionController");

const { authKaryawan, authAny } = require("../middlewares/roleMiddleware");

// POST transaksi keluar dengan FEFO
router.post(
  "/product-transactions/outgoing",
  authKaryawan,
  productTransactionController.createOutgoingTransaction
);

// GET semua transaksi (untuk admin dan/atau laporan)
router.get(
  "/product-transactions",
  authAny,
  productTransactionController.getAllTransactions
);

// GET transaksi per produk
router.get(
  "/product-transactions/product/:productId",
  authAny,
  productTransactionController.getTransactionsByProductId
);

// GET ringkasan transaksi harian (untuk dashboard)
router.get(
  "/product-transactions/daily-summary",
  authAny,
  productTransactionController.getDailyTransactionSummary
);

module.exports = router;
