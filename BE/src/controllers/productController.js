// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// // Menambahkan produk baru
// exports.createProduct = async (req, res) => {
//   const { code, name, brand, price, category } = req.body;

//   try {
//     const product = await prisma.product.create({
//       data: { code, name, brand, price, category },
//     });
//     res.status(201).json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to create product" });
//   }
// };

// // Mengambil semua produk
// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await prisma.product.findMany({
//       include: { batches: true },
//     });
//     res.status(200).json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// };

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

// Mengambil semua produk dengan total stok per produk
exports.getAllProducts = async (req, res) => {
  try {
    // Ambil semua produk
    const products = await prisma.product.findMany({
      include: {
        batches: true,
      },
    });

    // Hitung total stok per produk
    const productsWithTotalStock = products.map((product) => {
      const totalStock = product.batches.reduce(
        (sum, batch) => sum + batch.stock,
        0
      );
      const avgPrice =
        product.batches.length > 0
          ? Math.round(
              product.batches.reduce((sum, batch) => sum + batch.salePrice, 0) /
                product.batches.length
            )
          : product.price;

      return {
        ...product,
        totalStock,
        avgPrice,
      };
    });

    res.status(200).json(productsWithTotalStock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Mengambil satu produk dengan detail batchnya
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        batches: {
          orderBy: {
            expiredDate: "asc", // FEFO: paling dekat kedaluwarsa ada di atas
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Mengambil batches untuk popup - digunakan ketika user mengklik nama produk
exports.getProductBatches = async (req, res) => {
  const { productId } = req.params;

  try {
    const batches = await prisma.productBatch.findMany({
      where: {
        productId: parseInt(productId),
      },
      orderBy: {
        expiredDate: "asc", // FEFO: paling dekat kedaluwarsa ada di atas
      },
      include: {
        product: true,
      },
    });

    if (batches.length === 0) {
      return res
        .status(404)
        .json({ error: "No batches found for this product" });
    }

    res.status(200).json(batches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product batches" });
  }
};

// Update produk
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { code, name, brand, price, category } = req.body;

  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        code,
        name,
        brand,
        price,
        category,
      },
    });

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Hapus produk (soft delete atau hard delete sesuai kebutuhan)
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Cek apakah product memiliki batches
    const batches = await prisma.productBatch.findMany({
      where: { productId: parseInt(id) },
    });

    if (batches.length > 0) {
      return res.status(400).json({
        error:
          "Cannot delete product with existing batches. Please delete all batches first.",
      });
    }

    // Hapus produk jika tidak ada batches
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
