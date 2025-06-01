// controllers/riwayatController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRiwayat = async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const masukList = await prisma.produkMasuk.findMany({
      where: {
        tanggalMasuk: {
          gte: sevenDaysAgo,
          lte: today,
        },
      },
      include: {
        produk: {
          select: {
            nama: true,
            merk: true,
            kodeProduk: true,
          },
        },
        user: {
          select: { name: true },
        },
      },
      orderBy: { tanggalMasuk: "desc" },
    });

    const keluarList = await prisma.produkKeluar.findMany({
      where: {
        tanggalKeluar: {
          gte: sevenDaysAgo,
          lte: today,
        },
      },
      include: {
        produk: {
          select: {
            nama: true,
            merk: true,
            kodeProduk: true,
          },
        },
        user: {
          select: { name: true },
        },
      },
      orderBy: { tanggalKeluar: "desc" },
    });

    const riwayat = [
      ...masukList.map((item) => ({
        tanggal: item.tanggalMasuk,
        status: "MASUK",
        subStatus: null,
        namaProduk: item.produk.nama,
        merkProduk: item.produk.merk,
        kodeProduk: item.produk.kodeProduk,
        jumlah: item.jumlah,
        harga: item.hargaModal,
        user: item.user.name,
      })),
      ...keluarList.map((item) => ({
        tanggal: item.tanggalKeluar,
        status: "KELUAR",
        subStatus: item.status,
        namaProduk: item.produk.nama,
        merkProduk: item.produk.merk,
        kodeProduk: item.produk.kodeProduk,
        jumlah: item.jumlah,
        harga: item.hargaJual,
        user: item.user.name,
      })),
    ];

    riwayat.sort((a, b) => b.tanggal - a.tanggal);

    res.status(200).json({ data: riwayat });
  } catch (error) {
    console.error("Error getRiwayat:", error);
    res
      .status(500)
      .json({ message: "Gagal mengambil riwayat aktivitas", error });
  }
};
