const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Menambahkan produk baru
exports.createProduct = async (req, res) => {
  const { code, name, brand, price, category } = req.body;

  try {
    const product = await prisma.product.create({
      data: { code, name, brand, price, category },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Mengambil semua produk
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { batches: true },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
