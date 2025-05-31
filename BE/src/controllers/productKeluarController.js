import { PrismaClient, StatusKeluar } from "@prisma/client";
import { pushNotification } from "../utils/notificationService.js";

const prisma = new PrismaClient();

// Tambah Produk Keluar
export const tambahProdukKeluar = async (req, res) => {
  const { kodeProduk, jumlah, userId, tanggalKeluar, status } = req.body;

  // 1) Validasi wajib
  if (!kodeProduk || jumlah == null || !userId || !tanggalKeluar || !status) {
    return res.status(400).json({
      message:
        "kodeProduk, jumlah, userId, tanggal keluar, dan status wajib diisi.",
    });
  }

  // 2) Validasi status
  if (!Object.values(StatusKeluar).includes(status)) {
    return res.status(400).json({ message: "Status tidak valid." });
  }

  // 3) Validasi format & tanggalKeluar ≤ hari ini
  const dateKeluar = new Date(tanggalKeluar);
  if (isNaN(dateKeluar.getTime())) {
    return res.status(400).json({ message: "tanggal keluar tidak valid." });
  }
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const keluarDay = new Date(
    dateKeluar.getFullYear(),
    dateKeluar.getMonth(),
    dateKeluar.getDate()
  );
  if (keluarDay > today) {
    return res.status(400).json({
      message: "tanggal keluar tidak boleh lebih dari hari ini.",
    });
  }

  try {
    // 4) Cari master produk
    const produk = await prisma.produk.findUnique({
      where: { kodeProduk },
    });
    if (!produk) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    // 5) Ambil batch yang sisaStok > 0 (FEFO: tanggalExp ascending)
    let sisa = jumlah;
    const batchList = await prisma.produkStokKadaluarsa.findMany({
      where: {
        produkId: produk.id,
        sisaStok: { gt: 0 },
      },
      orderBy: { tanggalExp: "asc" },
    });

    let totalDikeluarkan = 0;

    // 6) Loop tiap batch
    for (const batch of batchList) {
      if (sisa <= 0) break;

      const ambil = Math.min(batch.sisaStok, sisa);
      const hargaModalPerUnit = produk.hargaModal;

      // 6b) Hitung keuntungan hanya kalau TERJUAL
      const keuntungan =
        status === StatusKeluar.TERJUAL
          ? (produk.hargaJual - hargaModalPerUnit) * ambil
          : 0;

      // 6c) Kurangi sisaStok batch
      await prisma.produkStokKadaluarsa.update({
        where: { id: batch.id },
        data: {
          sisaStok: batch.sisaStok - ambil,
        },
      });

      // 6d) Simpan entri ke ProdukKeluar
      await prisma.produkKeluar.create({
        data: {
          produkId: produk.id,
          userId,
          jumlah: ambil,
          hargaModal: hargaModalPerUnit,
          hargaJual: produk.hargaJual,
          keuntungan,
          status,
          tanggalKeluar: keluarDay,
        },
      });

      totalDikeluarkan += ambil;
      sisa -= ambil;
    }

    // 7) Jika stok tidak mencukupi
    if (sisa > 0) {
      return res.status(400).json({
        message: `Stok tidak mencukupi. Sisa kebutuhan: ${sisa} unit.`,
      });
    }

    // 8) Update stok master Produk
    await prisma.produk.update({
      where: { id: produk.id },
      data: { stok: produk.stok - totalDikeluarkan },
    });

    // 9) Push notifikasi “KELUAR”
    //    Contoh pesan: “Produk [nama] (merk [merk]) TERJUAL sebanyak X unit.”
    pushNotification({
      message: `Produk ${produk.nama} (merk ${produk.merk}) ${status} sebanyak ${totalDikeluarkan} unit.`,
      tanggal: new Date(),
      type: "KELUAR",
    });

    return res.status(201).json({
      message: `Produk berhasil dikeluarkan sebanyak ${totalDikeluarkan} unit.`,
    });
  } catch (error) {
    console.error("Produk keluar error:", error);
    return res.status(500).json({
      message: "Gagal mengeluarkan produk.",
      error: error.message,
    });
  }
};

// GET Stok per‐batch (hanya yang sisaStok > 0)
export const getStokByProduk = async (req, res) => {
  const { id } = req.params; // URL: /produk-keluar/:id/stok-batch

  try {
    const stokBatch = await prisma.produkStokKadaluarsa.findMany({
      where: {
        produkId: parseInt(id),
        sisaStok: { gt: 0 },
      },
      orderBy: { tanggalExp: "asc" },
    });
    return res.status(200).json({ data: stokBatch });
  } catch (error) {
    console.error("Get stok error:", error);
    return res.status(500).json({
      message: "Gagal mengambil stok batch produk.",
      error: error.message,
    });
  }
};
