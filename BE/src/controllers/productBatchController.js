const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Menambahkan batch baru
exports.createProductBatch = async (req, res) => {
  const { productId, entryDate, expiredDate, stock } = req.body;

  try {
    const productBatch = await prisma.productBatch.create({
      data: { productId, entryDate, expiredDate, stock },
    });
    res.status(201).json(productBatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product batch" });
  }
};

// Mengambil semua batch produk
exports.getAllProductBatches = async (req, res) => {
  try {
    const batches = await prisma.productBatch.findMany({
      include: { product: true },
    });
    res.status(200).json(batches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product batches" });
  }
};
