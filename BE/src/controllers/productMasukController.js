// src/controllers/productMasukController.js

import { PrismaClient } from "@prisma/client";
import { pushNotification } from "../utils/notificationService.js";

const prisma = new PrismaClient();

// Tambah Produk Masuk
export const tambahProdukMasuk = async (req, res) => {
  const { kodeProduk, jumlah, userId, tanggalMasuk, tanggalExp } = req.body;

  if (!kodeProduk || jumlah == null || !userId || !tanggalMasuk) {
    return res.status(400).json({
      message: "kodeProduk, jumlah, userId, dan tanggal masuk wajib diisi.",
    });
  }

  const dateMasuk = new Date(tanggalMasuk);
  if (isNaN(dateMasuk.getTime())) {
    return res.status(400).json({ message: "tanggal masuk tidak valid." });
  }
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const masukDay = new Date(
    dateMasuk.getFullYear(),
    dateMasuk.getMonth(),
    dateMasuk.getDate()
  );
  if (masukDay > today) {
    return res.status(400).json({
      message: "tanggal masuk tidak boleh lebih dari hari ini.",
    });
  }

  let expDateObj = null;
  if (tanggalExp) {
    expDateObj = new Date(tanggalExp);
    if (isNaN(expDateObj.getTime())) {
      return res.status(400).json({ message: "tanggal Expired tidak valid." });
    }
  }

  try {
    const produk = await prisma.produk.findUnique({
      where: { kodeProduk },
    });
    if (!produk) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    await prisma.produkMasuk.create({
      data: {
        produkId: produk.id,
        userId,
        jumlah,
        hargaModal: produk.hargaModal,
        tanggalMasuk: masukDay,
        tanggalExp: expDateObj,
      },
    });

    if (expDateObj) {
      const existingBatch = await prisma.produkStokKadaluarsa.findFirst({
        where: {
          produkId: produk.id,
          tanggalExp: expDateObj,
        },
      });

      if (existingBatch) {
        await prisma.produkStokKadaluarsa.update({
          where: { id: existingBatch.id },
          data: {
            stokAwal: existingBatch.stokAwal + jumlah,
            sisaStok: existingBatch.sisaStok + jumlah,
          },
        });
      } else {
        await prisma.produkStokKadaluarsa.create({
          data: {
            produkId: produk.id,
            stokAwal: jumlah,
            sisaStok: jumlah,
            tanggalExp: expDateObj,
          },
        });
      }
    } else {
      const existingNoExpBatch = await prisma.produkStokKadaluarsa.findFirst({
        where: {
          produkId: produk.id,
          tanggalExp: null,
        },
      });

      if (existingNoExpBatch) {
        await prisma.produkStokKadaluarsa.update({
          where: { id: existingNoExpBatch.id },
          data: {
            stokAwal: existingNoExpBatch.stokAwal + jumlah,
            sisaStok: existingNoExpBatch.sisaStok + jumlah,
          },
        });
      } else {
        await prisma.produkStokKadaluarsa.create({
          data: {
            produkId: produk.id,
            stokAwal: jumlah,
            sisaStok: jumlah,
            tanggalExp: null,
          },
        });
      }
    }

    await prisma.produk.update({
      where: { id: produk.id },
      data: { stok: produk.stok + jumlah },
    });

    pushNotification({
      message: `Stok baru ${produk.nama} (merk ${produk.merk}) sebanyak ${jumlah} unit.`,
      tanggal: new Date(),
      type: "MASUK",
    });

    return res.status(201).json({
      message: "Produk masuk berhasil ditambahkan.",
    });
  } catch (error) {
    console.error("Produk masuk error:", error);
    return res.status(500).json({
      message: "Gagal menambahkan produk masuk.",
      error: error.message,
    });
  }
};
