import { PrismaClient, StatusKeluar } from "@prisma/client";
import { pushNotification } from "../utils/notificationService.js";

const prisma = new PrismaClient();

// Tambah Produk Keluar
export const tambahProdukKeluar = async (req, res) => {
  const { kodeProduk, jumlah, userId, tanggalKeluar, status } = req.body;

  // Validasi wajib
  if (!kodeProduk || jumlah == null || !userId || !tanggalKeluar || !status) {
    return res.status(400).json({
      message:
        "kodeProduk, jumlah, userId, tanggal keluar, dan status wajib diisi.",
    });
  }

  // Validasi status
  if (!Object.values(StatusKeluar).includes(status)) {
    return res.status(400).json({ message: "Status tidak valid." });
  }

  // Validasi tanggal
  const dateKeluar = new Date(tanggalKeluar);
  if (isNaN(dateKeluar.getTime())) {
    return res.status(400).json({ message: "Tanggal keluar tidak valid." });
  }
  const today = new Date();
  const keluarDay = new Date(
    dateKeluar.getFullYear(),
    dateKeluar.getMonth(),
    dateKeluar.getDate()
  );
  if (
    keluarDay > new Date(today.getFullYear(), today.getMonth(), today.getDate())
  ) {
    return res
      .status(400)
      .json({ message: "Tanggal keluar tidak boleh lebih dari hari ini." });
  }

  try {
    // 1) Cari produk master
    const produk = await prisma.produk.findUnique({ where: { kodeProduk } });
    if (!produk) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    // 2) Ambil batch FEFO
    let sisa = jumlah;
    const batchList = await prisma.produkStokKadaluarsa.findMany({
      where: { produkId: produk.id, sisaStok: { gt: 0 } },
      orderBy: { tanggalExp: "asc" },
    });

    let totalDikeluarkan = 0;

    for (const batch of batchList) {
      if (sisa <= 0) break;

      const ambil = Math.min(batch.sisaStok, sisa);
      const hargaModalPerUnit = produk.hargaModal;

      // **Baru**: Hitung keuntungan negatif untuk rusak/kadaluarsa
      let keuntungan;
      if (status === StatusKeluar.TERJUAL) {
        keuntungan = (produk.hargaJual - hargaModalPerUnit) * ambil;
      } else {
        // RUSAK atau KADALUARSA
        keuntungan = -(hargaModalPerUnit * ambil);
      }

      // Kurangi stok batch
      await prisma.produkStokKadaluarsa.update({
        where: { id: batch.id },
        data: { sisaStok: batch.sisaStok - ambil },
      });

      // Simpan entri keluar
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

    if (sisa > 0) {
      return res.status(400).json({
        message: `Stok tidak mencukupi. Sisa kebutuhan: ${sisa} unit.`,
      });
    }

    // Update stok master
    await prisma.produk.update({
      where: { id: produk.id },
      data: { stok: produk.stok - totalDikeluarkan },
    });

    // Push notifikasi
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
