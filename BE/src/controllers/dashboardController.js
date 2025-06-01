// src/controllers/dashboardController.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getDashboard = async (req, res) => {
  try {
    const today = new Date();

    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const aggTotalStok = await prisma.produk.aggregate({
      _sum: { stok: true },
    });
    const totalStok = aggTotalStok._sum.stok || 0;

    const grouped = await prisma.produk.groupBy({
      by: ["kategori"],
      _sum: {
        stok: true,
      },
    });

    const kategoriList = ["OBAT_BEBAS", "OBAT_KERAS", "KONSI", "ALKES"];
    const totalPerKategori = {};
    kategoriList.forEach((k) => (totalPerKategori[k] = 0));

    grouped.forEach((entry) => {
      totalPerKategori[entry.kategori] = entry._sum.stok || 0;
    });

    const masukHariIni = await prisma.produkMasuk.findMany({
      where: {
        tanggalMasuk: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      select: {
        hargaModal: true,
        jumlah: true,
      },
    });

    let totalBiayaModalHariIni = 0;
    masukHariIni.forEach((row) => {
      totalBiayaModalHariIni += row.hargaModal * row.jumlah;
    });

    const keluarHariIni = await prisma.produkKeluar.findMany({
      where: {
        status: "TERJUAL",
        tanggalKeluar: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      select: {
        hargaJual: true,
        jumlah: true,
      },
    });

    let totalPendapatanHariIni = 0;
    keluarHariIni.forEach((row) => {
      totalPendapatanHariIni += row.hargaJual * row.jumlah;
    });

    return res.status(200).json({
      totalStok,
      totalPerKategori,
      totalBiayaModalHariIni,
      totalPendapatanHariIni,
    });
  } catch (error) {
    console.error("Error getDashboard:", error);
    return res.status(500).json({
      message: "Gagal mengambil data dashboard",
      error: error.message,
    });
  }
};
