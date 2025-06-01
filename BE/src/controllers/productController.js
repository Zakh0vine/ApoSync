//productController.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const validKategori = ["OBAT_BEBAS", "OBAT_KERAS", "KONSI", "ALKES"];

function isValidKategori(kategori) {
  return validKategori.includes(kategori);
}

// Tambahkan produk baru
export const createProduk = async (req, res) => {
  const { nama, merk, kodeProduk, kategori, hargaModal, sudahTermasukPPN } =
    req.body;

  // Validasi field wajib
  if (!nama || !merk || !kodeProduk || !kategori || hargaModal == null) {
    return res.status(400).json({ message: "Semua field wajib diisi." });
  }

  // Validasi kategori
  if (!isValidKategori(kategori)) {
    return res.status(400).json({
      message: `Kategori tidak valid. Pilihan: ${validKategori.join(", ")}`,
    });
  }

  try {
    let hargaModalPPN = parseFloat(hargaModal);

    // Hitung PPN jika belum termasuk
    if (!sudahTermasukPPN) {
      hargaModalPPN *= 1.11;
    }
    // Bulatkan hargaModalPPN ke integer terdekat
    hargaModalPPN = Math.round(hargaModalPPN);
    // Hitung harga jual (markup 25%) dan pembulatan ribuan
    let hargaJual = hargaModalPPN * 1.25;
    hargaJual = Math.round(hargaJual / 500) * 500;

    const produkBaru = await prisma.produk.create({
      data: {
        nama,
        merk,
        kodeProduk,
        kategori,
        hargaModal: hargaModalPPN,
        hargaJual,
        stok: 0, // Default 0 saat awal
      },
    });

    return res.status(201).json({
      message: "Produk berhasil ditambahkan",
      data: produkBaru,
    });
  } catch (error) {
    console.error("Create produk error:", error);
    return res.status(500).json({ message: "Gagal menambahkan produk." });
  }
};

// Update produk
export const updateProduk = async (req, res) => {
  const { id } = req.params;
  const { nama, merk, kodeProduk, kategori, hargaModal, hargaJual } = req.body;

  if (kategori && !isValidKategori(kategori)) {
    return res.status(400).json({
      message: `Kategori tidak valid. Pilihan yang diizinkan: ${validKategori.join(
        ", "
      )}`,
    });
  }

  try {
    const produkLama = await prisma.produk.findUnique({
      where: { id: parseInt(id) },
    });

    if (!produkLama) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    // Jika hargaModal di‐update, recalc hargaJual sesuai markup 25% + pembulatan ke 500
    let baruHargaModal = produkLama.hargaModal;
    let baruHargaJual = produkLama.hargaJual;

    if (hargaModal != null) {
      baruHargaModal = parseFloat(hargaModal);
      // hitung markup 25%
      const markup = baruHargaModal * 1.25;
      // pembulatan ke kelipatan 500
      baruHargaJual = Math.round(markup / 500) * 500;
    } else if (hargaJual != null) {
      // Jika user memasukkan hargaJual secara eksplisit, gunakan saja nilai itu
      baruHargaJual = parseFloat(hargaJual);
    }

    const updatedProduk = await prisma.produk.update({
      where: { id: parseInt(id) },
      data: {
        nama: nama ?? produkLama.nama,
        merk: merk ?? produkLama.merk,
        kodeProduk: kodeProduk ?? produkLama.kodeProduk,
        kategori: kategori ?? produkLama.kategori,
        hargaModal: hargaModal != null ? baruHargaModal : produkLama.hargaModal,
        hargaJual: baruHargaJual,
      },
    });

    return res.status(200).json({
      message: "Produk berhasil diperbarui (master)",
      data: updatedProduk,
    });
  } catch (error) {
    console.error("Update produk error:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui produk.",
    });
  }
};

// Ambil semua produk (termasuk stok total dari batch)
export const getAllProduk = async (req, res) => {
  try {
    const semuaProduk = await prisma.produk.findMany({
      include: {
        stokBatch: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Berhasil mengambil semua produk",
      data: semuaProduk,
    });
  } catch (error) {
    console.error("Get all produk error:", error);
    return res.status(500).json({ message: "Gagal mengambil data produk." });
  }
};

// Ambil produk berdasarkan ID
export const getProdukById = async (req, res) => {
  const { id } = req.params;

  try {
    const produk = await prisma.produk.findUnique({
      where: { id: parseInt(id) },
      include: {
        stokBatch: true,
      },
    });

    if (!produk) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    return res.status(200).json({
      message: "Produk ditemukan",
      data: produk,
    });
  } catch (error) {
    console.error("Get produk by ID error:", error);
    return res.status(500).json({ message: "Gagal mengambil data produk." });
  }
};

// Hapus produk
export const deleteProduk = async (req, res) => {
  const { id } = req.params;

  try {
    const produk = await prisma.produk.findUnique({
      where: { id: parseInt(id) },
    });

    if (!produk) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    await prisma.produk.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: "Produk berhasil dihapus." });
  } catch (error) {
    console.error("Delete produk error:", error);
    return res.status(500).json({ message: "Gagal menghapus produk." });
  }
};
