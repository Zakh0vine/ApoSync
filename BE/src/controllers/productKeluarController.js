import { PrismaClient, StatusKeluar } from "@prisma/client";
import { pushNotification } from "../utils/notificationService.js";

const prisma = new PrismaClient();

// Tambah Produk Keluar
export const tambahProdukKeluar = async (req, res) => {
  const { kodeProduk, jumlah, userId, tanggalKeluar, status } = req.body;

  // 1. Validasi wajib
  if (!kodeProduk || jumlah == null || !userId || !tanggalKeluar || !status) {
    return res.status(400).json({
      message:
        "kodeProduk, jumlah, userId, tanggal keluar, dan status wajib diisi.",
    });
  }
  // 2. Validasi status
  if (!Object.values(StatusKeluar).includes(status)) {
    return res.status(400).json({ message: "Status tidak valid." });
  }
  // 3. Validasi tanggal
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
    // 4. Cari produk master
    const produk = await prisma.produk.findUnique({ where: { kodeProduk } });
    if (!produk) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    // 5. Ambil semua batch FEFO yang masih sisa
    const batchList = await prisma.produkStokKadaluarsa.findMany({
      where: { produkId: produk.id, sisaStok: { gt: 0 } },
      orderBy: { tanggalExp: "asc" },
    });

    // 6. Cek kecukupan total stok sebelum write
    const totalStok = batchList.reduce((sum, b) => sum + b.sisaStok, 0);
    if (jumlah > totalStok) {
      return res.status(400).json({
        message: `Stok tidak mencukupi. Sisa kebutuhan: ${
          jumlah - totalStok
        } unit.`,
      });
    }

    // 7. Jalankan transaksi atomik
    let totalDikeluarkan = 0;
    await prisma.$transaction(async (tx) => {
      let sisa = jumlah;
      for (const batch of batchList) {
        if (sisa <= 0) break;
        const ambil = Math.min(batch.sisaStok, sisa);
        const hargaModalPerUnit = produk.hargaModal;

        // Hitung keuntungan
        let keuntungan;
        if (status === StatusKeluar.TERJUAL) {
          keuntungan = (produk.hargaJual - hargaModalPerUnit) * ambil;
        } else {
          keuntungan = -(hargaModalPerUnit * ambil);
        }

        // Update stok batch
        await tx.produkStokKadaluarsa.update({
          where: { id: batch.id },
          data: { sisaStok: batch.sisaStok - ambil },
        });

        // Simpan entri keluar
        await tx.produkKeluar.create({
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

      // Update stok master
      await tx.produk.update({
        where: { id: produk.id },
        data: { stok: produk.stok - totalDikeluarkan },
      });
    });

    // 8. Push notifikasi (di luar transaksi agar tidak memblokir DB)
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
