// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// const jwt = require("jsonwebtoken");

// // Menambahkan batch baru sekaligus mencatat transaksi masuk
// exports.createProductBatch = async (req, res) => {
//   const { productId, entryDate, expiredDate, stock, basePrice, includeVAT } =
//     req.body;

//   const token = req.headers.authorization?.split(" ")[1]; // Ambil token dari header Authorization

//   if (!token) {
//     return res.status(401).json({ error: "Token is required" });
//   }

//   try {
//     // Verifikasi token untuk mendapatkan userId
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.id;

//     // Hitung harga jual berdasarkan harga modal dan PPN
//     let finalBasePrice = basePrice;

//     // Jika belum include PPN, tambahkan 11%
//     if (!includeVAT) {
//       finalBasePrice = Math.round(basePrice * 1.11);
//     }

//     // Harga jual = harga modal + keuntungan 25%
//     const salePrice = Math.round(finalBasePrice * 1.25);

//     const productBatch = await prisma.productBatch.create({
//       data: {
//         productId,
//         entryDate: new Date(entryDate),
//         expiredDate: expiredDate ? new Date(expiredDate) : null,
//         stock,
//         basePrice: finalBasePrice, // Harga modal final (sudah termasuk PPN)
//         salePrice, // Harga jual
//         includeVAT: includeVAT ?? false,
//       },
//     });

//     // Catat juga ke tabel transaksi sebagai "MASUK"
//     await prisma.productTransaction.create({
//       data: {
//         batchId: productBatch.id,
//         userId,
//         quantity: stock,
//         type: "MASUK",
//         actionDate: new Date(),
//       },
//     });

//     res.status(201).json({
//       message: "Product batch created and transaction recorded successfully",
//       batch: productBatch,
//     });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "Failed to create product batch and record transaction" });
//   }
// };

// // Mengambil semua batch produk
// exports.getAllProductBatches = async (req, res) => {
//   try {
//     const batches = await prisma.productBatch.findMany({
//       include: {
//         product: true,
//         transactions: {
//           include: {
//             user: {
//               select: { id: true, name: true, email: true },
//             },
//           },
//         },
//       },
//       orderBy: {
//         expiredDate: "asc", // FEFO: paling dekat kedaluwarsa ada di atas
//       },
//     });

//     res.status(200).json(batches);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch product batches" });
//   }
// };

// // Mengambil satu batch produk berdasarkan ID
// exports.getProductBatchById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const batch = await prisma.productBatch.findUnique({
//       where: { id: parseInt(id) },
//       include: {
//         product: true,
//         transactions: {
//           include: {
//             user: {
//               select: { id: true, name: true, email: true },
//             },
//           },
//         },
//       },
//     });

//     if (!batch) {
//       return res.status(404).json({ error: "Batch not found" });
//     }

//     res.status(200).json(batch);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch product batch" });
//   }
// };

// // Update batch produk
// exports.updateProductBatch = async (req, res) => {
//   const { id } = req.params;
//   const { entryDate, expiredDate, stock, basePrice, salePrice, includeVAT } =
//     req.body;

//   try {
//     const updatedBatch = await prisma.productBatch.update({
//       where: { id: parseInt(id) },
//       data: {
//         entryDate: entryDate ? new Date(entryDate) : undefined,
//         expiredDate: expiredDate ? new Date(expiredDate) : undefined,
//         stock,
//         basePrice,
//         salePrice,
//         includeVAT,
//       },
//     });

//     res.status(200).json(updatedBatch);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to update product batch" });
//   }
// };

// // Hapus batch produk
// exports.deleteProductBatch = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Cek apakah batch memiliki transaksi terkait
//     const transactions = await prisma.productTransaction.findMany({
//       where: { batchId: parseInt(id) },
//     });

//     if (transactions.length > 1) {
//       // Lebih dari 1 karena setidaknya ada 1 transaksi MASUK
//       return res.status(400).json({
//         error: "Cannot delete batch with existing transactions.",
//       });
//     }

//     // Hapus transaksi terkait terlebih dahulu
//     await prisma.productTransaction.deleteMany({
//       where: { batchId: parseInt(id) },
//     });

//     // Kemudian hapus batch
//     await prisma.productBatch.delete({
//       where: { id: parseInt(id) },
//     });

//     res.status(200).json({ message: "Product batch deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to delete product batch" });
//   }
// };

// src/controllers/productBatchController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

// Tambahkan batch baru dan catat transaksi MASUK
exports.createProductBatch = async (req, res) => {
  const { productId, entryDate, expiredDate, stock, basePrice, includeVAT } =
    req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    let finalBasePrice = basePrice;
    if (!includeVAT) {
      finalBasePrice = Math.round(basePrice * 1.11);
    }

    const salePrice = Math.round(finalBasePrice * 1.25);

    const productBatch = await prisma.productBatch.create({
      data: {
        productId: parseInt(productId),
        entryDate: new Date(entryDate),
        expiredDate: expiredDate ? new Date(expiredDate) : null,
        stock: parseInt(stock),
        basePrice: parseInt(basePrice),
        includeVAT,
        salePrice,
      },
    });

    await prisma.productTransaction.create({
      data: {
        batchId: productBatch.id,
        userId,
        quantity: parseInt(stock),
        type: "MASUK",
        actionDate: new Date(entryDate),
      },
    });

    res.status(201).json(productBatch);
  } catch (error) {
    console.error("Error creating product batch:", error);
    res.status(500).json({ error: "Failed to create product batch" });
  }
};

// Ambil semua batch berdasarkan produk tertentu
exports.getBatchesByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    const batches = await prisma.productBatch.findMany({
      where: { productId: parseInt(productId) },
      orderBy: { expiredDate: "asc" },
      include: { product: true },
    });

    if (batches.length === 0) {
      return res
        .status(404)
        .json({ error: "No batches found for this product" });
    }

    res.status(200).json(batches);
  } catch (error) {
    console.error("Error fetching product batches:", error);
    res.status(500).json({ error: "Failed to fetch product batches" });
  }
};

// Update batch (jika diperlukan fitur edit batch di masa depan)
exports.updateProductBatch = async (req, res) => {
  const { id } = req.params;
  const { expiredDate, stock, basePrice, includeVAT } = req.body;

  try {
    let finalBasePrice = basePrice;
    if (!includeVAT) {
      finalBasePrice = Math.round(basePrice * 1.11);
    }
    const salePrice = Math.round(finalBasePrice * 1.25);

    const updatedBatch = await prisma.productBatch.update({
      where: { id: parseInt(id) },
      data: {
        expiredDate: expiredDate ? new Date(expiredDate) : undefined,
        stock: parseInt(stock),
        basePrice: parseInt(basePrice),
        includeVAT,
        salePrice,
      },
    });

    res.status(200).json(updatedBatch);
  } catch (error) {
    console.error("Error updating product batch:", error);
    res.status(500).json({ error: "Failed to update product batch" });
  }
};

// Hapus batch jika tidak ada transaksi keluar (opsional jika ingin aman)
exports.deleteProductBatch = async (req, res) => {
  const { id } = req.params;

  try {
    const transactions = await prisma.productTransaction.findMany({
      where: {
        batchId: parseInt(id),
        type: "KELUAR",
      },
    });

    if (transactions.length > 0) {
      return res.status(400).json({
        error: "Cannot delete batch with outgoing transactions",
      });
    }

    await prisma.productBatch.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Batch deleted successfully" });
  } catch (error) {
    console.error("Error deleting product batch:", error);
    res.status(500).json({ error: "Failed to delete product batch" });
  }
};
