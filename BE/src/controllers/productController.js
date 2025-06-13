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
    // Hitung hargaModal beserta PPN jika belum termasuk
    let hargaModalPPN = parseFloat(hargaModal);
    if (!sudahTermasukPPN) {
      hargaModalPPN *= 1.11;
    }
    hargaModalPPN = Math.round(hargaModalPPN);

    // Hitung hargaJual (markup 25%) + pembulatan ke kelipatan 500
    let hargaJual = hargaModalPPN * 1.25;
    hargaJual = Math.round(hargaJual / 500) * 500;

    // Cobalah create produk baru
    const produkBaru = await prisma.produk.create({
      data: {
        nama,
        merk,
        kodeProduk,
        kategori,
        hargaModal: hargaModalPPN,
        hargaJual,
        stok: 0,
      },
    });

    return res.status(201).json({
      message: "Produk berhasil ditambahkan",
      data: produkBaru,
    });
  } catch (error) {
    // Jika kodeProduk sudah ada → unik constraint P2002
    if (error.code === "P2002" && error.meta?.target?.includes("kodeProduk")) {
      // Ambil produk yang sudah ada, lalu kembalikan sebagai 200 OK
      try {
        const existing = await prisma.produk.findUnique({
          where: { kodeProduk },
        });
        return res.status(200).json({
          message: "Produk sudah ada",
          data: existing,
        });
      } catch (fetchErr) {
        console.error("Fetch existing produk after P2002 failed:", fetchErr);
        return res.status(500).json({
          message: "Gagal mengambil data produk yang sudah ada.",
        });
      }
    }

    console.error("Create produk error:", error);
    return res.status(500).json({ message: "Gagal menambahkan produk." });
  }
};

// Update produk
export const updateProduk = async (req, res) => {
  const { id } = req.params;
  const {
    nama,
    merk,
    kodeProduk,
    kategori,
    hargaModal,
    sudahTermasukPPN,
    hargaJual,
  } = req.body;

  if (kategori && !isValidKategori(kategori)) {
    return res.status(400).json({
      message: `Kategori tidak valid. Pilihan: ${validKategori.join(", ")}`,
    });
  }

  try {
    const produkLama = await prisma.produk.findUnique({
      where: { id: parseInt(id) },
    });
    if (!produkLama) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    // Tentukan harga modal baru
    let baruHargaModal = produkLama.hargaModal;
    // Jika user update harga modal
    if (hargaModal != null) {
      let modal = parseFloat(hargaModal);
      // hitung PPN jika perlu
      if (!sudahTermasukPPN) {
        modal = Math.round(modal * 1.11);
      }
      baruHargaModal = modal;
    }

    // Tentukan harga jual baru
    let baruHargaJual = produkLama.hargaJual;
    // Jika user explicit update harga jual
    if (hargaJual != null) {
      baruHargaJual = parseFloat(hargaJual);
    } else if (hargaModal != null) {
      // recalc markup dari harga modal baru
      baruHargaJual = Math.round((baruHargaModal * 1.25) / 500) * 500;
    }

    const updated = await prisma.produk.update({
      where: { id: parseInt(id) },
      data: {
        nama: nama ?? produkLama.nama,
        merk: merk ?? produkLama.merk,
        kodeProduk: kodeProduk ?? produkLama.kodeProduk,
        kategori: kategori ?? produkLama.kategori,
        hargaModal: baruHargaModal,
        hargaJual: baruHargaJual,
      },
    });

    return res
      .status(200)
      .json({ message: "Produk berhasil diperbarui", data: updated });
  } catch (error) {
    console.error("Update produk error:", error);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan saat memperbarui produk." });
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
