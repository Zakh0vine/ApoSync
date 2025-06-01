// src/controllers/notificationController.js

import { PrismaClient, StatusKeluar } from "@prisma/client";
import {
  getNotifications as getPushedNotifications,
  pushNotification,
} from "../utils/notificationService.js";

const prisma = new PrismaClient();

export const getAllNotifications = async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0
    );
    const startOfTomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );

    const pushed = getPushedNotifications();

    const lowStockList = await prisma.produk.findMany({
      where: { stok: { lt: 10 } },
      select: {
        id: true,
        nama: true,
        merk: true,
        kodeProduk: true,
        stok: true,
      },
    });

    const notifLowStock = lowStockList.map((p) => ({
      id: Date.now() + p.id,
      message: `Stok produk ${p.nama} (merk ${p.merk}, kode ${p.kodeProduk}) tersisa ${p.stok} unit.`,
      tanggal: new Date(),
      type: "STOK_RENDAH",
    }));

    const expiredBatches = await prisma.produkStokKadaluarsa.findMany({
      where: {
        tanggalExp: {
          gte: startOfToday,
          lt: startOfTomorrow,
        },
        sisaStok: { gt: 0 },
      },
      include: {
        produk: { select: { nama: true, merk: true, kodeProduk: true } },
      },
    });

    const notifExpired = expiredBatches.map((b) => ({
      id: Date.now() + b.id,
      message: `Produk ${b.produk.nama} (merk ${b.produk.merk}, kode ${b.produk.kodeProduk}) Expired hari ini, sisa ${b.sisaStok} unit.`,
      tanggal: new Date(),
      type: "EXPIRED",
    }));

    let all = [...pushed, ...notifLowStock, ...notifExpired];

    all.sort((a, b) => {
      const ta =
        a.tanggal instanceof Date
          ? a.tanggal.getTime()
          : new Date(a.tanggal).getTime();
      const tb =
        b.tanggal instanceof Date
          ? b.tanggal.getTime()
          : new Date(b.tanggal).getTime();
      if (tb !== ta) return tb - ta;
      return b.id - a.id;
    });

    const top10 = all.slice(0, 10);

    return res.status(200).json({ data: top10 });
  } catch (error) {
    console.error("Error getAllNotifications:", error);
    return res.status(500).json({
      message: "Gagal mengambil notifikasi.",
      error: error.message,
    });
  }
};
