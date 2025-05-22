// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// // Transaksi keluar stok dari suatu batch
// exports.createOutgoingTransaction = async (req, res) => {
//   const { batchId, userId, quantity } = req.body;

//   try {
//     const batch = await prisma.productBatch.findUnique({
//       where: { id: batchId },
//     });

//     if (!batch) {
//       return res.status(404).json({ error: "Batch not found" });
//     }

//     if (batch.stock < quantity) {
//       return res.status(400).json({ error: "Insufficient stock in batch" });
//     }

//     // Kurangi stok batch
//     await prisma.productBatch.update({
//       where: { id: batchId },
//       data: { stock: batch.stock - quantity },
//     });

//     // Catat transaksi keluar
//     const transaction = await prisma.productTransaction.create({
//       data: {
//         batchId,
//         userId,
//         quantity,
//         type: "KELUAR",
//         actionDate: new Date(),
//       },
//     });

//     res.status(201).json({
//       message: "Stock deducted and transaction recorded successfully",
//       transaction,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to process outgoing transaction" });
//   }
// };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

// Transaksi keluar stok dari suatu batch dengan algoritma FEFO
exports.createOutgoingTransaction = async (req, res) => {
  const { productId, quantity } = req.body;

  const token = req.headers.authorization?.split(" ")[1]; // Ambil token dari header Authorization

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  try {
    // Verifikasi token untuk mendapatkan userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Validasi data yang diperlukan
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: "Invalid product or quantity" });
    }

    // Dapatkan semua batch untuk produk ini, diurutkan berdasarkan tanggal expired terdekat (FEFO)
    const productBatches = await prisma.productBatch.findMany({
      where: {
        productId: parseInt(productId),
        stock: {
          gt: 0, // Hanya ambil batch yang masih ada stoknya
        },
      },
      orderBy: {
        expiredDate: "asc", // FEFO: paling dekat kedaluwarsa ada di atas
      },
    });

    if (productBatches.length === 0) {
      return res
        .status(404)
        .json({ error: "No available batches found for this product" });
    }

    // Hitung total stok yang tersedia
    const totalAvailableStock = productBatches.reduce(
      (sum, batch) => sum + batch.stock,
      0
    );

    if (totalAvailableStock < quantity) {
      return res.status(400).json({
        error: "Insufficient stock available",
        availableStock: totalAvailableStock,
      });
    }

    let remainingQuantity = quantity;
    const transactions = [];

    // Implementasi FEFO
    for (const batch of productBatches) {
      if (remainingQuantity <= 0) break;

      const batchQuantityToDeduct = Math.min(remainingQuantity, batch.stock);

      // Update stok batch
      await prisma.productBatch.update({
        where: { id: batch.id },
        data: { stock: batch.stock - batchQuantityToDeduct },
      });

      // Catat transaksi keluar untuk batch ini
      const transaction = await prisma.productTransaction.create({
        data: {
          batchId: batch.id,
          userId,
          quantity: batchQuantityToDeduct,
          type: "KELUAR",
          actionDate: new Date(),
        },
      });

      transactions.push(transaction);
      remainingQuantity -= batchQuantityToDeduct;
    }

    res.status(201).json({
      message:
        "Stock deducted using FEFO algorithm and transactions recorded successfully",
      transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process outgoing transaction" });
  }
};

// Mendapatkan semua transaksi
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await prisma.productTransaction.findMany({
      include: {
        batch: {
          include: {
            product: true,
          },
        },
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: {
        actionDate: "desc", // Transaksi terbaru di atas
      },
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// Mendapatkan transaksi per produk
exports.getTransactionsByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    const transactions = await prisma.productTransaction.findMany({
      where: {
        batch: {
          productId: parseInt(productId),
        },
      },
      include: {
        batch: {
          include: {
            product: true,
          },
        },
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: {
        actionDate: "desc",
      },
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// Mendapatkan log transaksi untuk dashboard
exports.getDailyTransactionSummary = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const transactions = await prisma.productTransaction.findMany({
      where: {
        actionDate: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        batch: true,
        user: {
          select: { id: true, name: true },
        },
      },
    });

    // Hitung total modal dan keuntungan untuk hari ini
    let totalCapital = 0;
    let totalProfit = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "KELUAR") {
        // Modal dari harga dasar batch
        const capital = transaction.batch.basePrice * transaction.quantity;
        totalCapital += capital;

        // Keuntungan dari selisih harga jual dan harga dasar
        const profit =
          (transaction.batch.salePrice - transaction.batch.basePrice) *
          transaction.quantity;
        totalProfit += profit;
      }
    });

    res.status(200).json({
      date: today,
      totalTransactions: transactions.length,
      totalCapital,
      totalProfit,
      transactions,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch daily transaction summary" });
  }
};
