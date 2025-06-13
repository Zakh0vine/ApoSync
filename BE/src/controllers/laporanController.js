// controllers/laporanController.js

import { PrismaClient } from "@prisma/client";
import PDFDocument from "pdfkit";

const prisma = new PrismaClient();

// GET /laporan/persediaan
export const getLaporanPersediaan = async (req, res) => {
  try {
    const produk = await prisma.produk.findMany({
      select: { nama: true, merk: true, kodeProduk: true, stok: true },
      orderBy: { nama: "asc" },
    });

    const data = produk.map((p) => ({
      namaProduk: p.nama,
      merekProduk: p.merk,
      kodeProduk: p.kodeProduk,
      totalSisaStok: p.stok,
    }));

    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error getLaporanPersediaan:", error);
    return res
      .status(500)
      .json({
        message: "Gagal mengambil data persediaan",
        error: error.message,
      });
  }
};

// GET /laporan/laba
export const getLaporanLaba = async (req, res) => {
  try {
    const today = new Date();
    const last30 = new Date(today);
    last30.setDate(today.getDate() - 29);

    const produkList = await prisma.produk.findMany({
      select: {
        nama: true,
        merk: true,
        hargaModal: true,
        hargaJual: true,
        produkKeluar: {
          where: { tanggalKeluar: { gte: last30, lte: today } },
          select: { keuntungan: true },
        },
      },
      orderBy: { nama: "asc" },
    });

    const data = produkList.map((p) => ({
      namaProduk: p.nama,
      merekProduk: p.merk,
      hargaModal: p.hargaModal,
      hargaJual: p.hargaJual,
      totalKeuntungan: p.produkKeluar.reduce((sum, t) => sum + t.keuntungan, 0),
    }));

    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error getLaporanLaba:", error);
    return res
      .status(500)
      .json({ message: "Gagal mengambil data laba", error: error.message });
  }
};

// GET /laporan/download
export const downloadLaporanPDF = async (req, res) => {
  try {
    // Ambil data persediaan
    const persediaan = await prisma.produk.findMany({
      select: { nama: true, merk: true, kodeProduk: true, stok: true },
      orderBy: { nama: "asc" },
    });

    // Ambil data laba 30 hari terakhir
    const today = new Date();
    const last30 = new Date(today);
    last30.setDate(today.getDate() - 29);

    const labaList = await prisma.produk.findMany({
      select: {
        nama: true,
        merk: true,
        hargaModal: true,
        hargaJual: true,
        produkKeluar: {
          where: { tanggalKeluar: { gte: last30, lte: today } },
          select: { keuntungan: true },
        },
      },
      orderBy: { nama: "asc" },
    });

    // Setup PDF A4, margin 40
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="laporan_persediaan_laba.pdf"'
    );
    doc.pipe(res);

    // Daftarkan font Times New Roman
    doc.registerFont("Times-Roman", "Times-Roman");
    doc.registerFont("Times-Bold", "Times-Bold");

    // Judul dan Apotek
    doc
      .font("Times-Bold")
      .fontSize(16)
      .text("Laporan Persediaan & Laba 30 Hari", { align: "center" });
    doc.moveDown(0.25);
    doc
      .font("Times-Roman")
      .fontSize(14)
      .text("Apotek Dian Brata Medika", { align: "center" });
    doc.moveDown(0.5);

    // Tanggal unduh & nama dokter (lebih ditarik ke atas)
    const dateStr = today.toLocaleDateString("id-ID");
    doc
      .font("Times-Roman")
      .fontSize(10)
      .text(`Tanggal Unduh: ${dateStr}`, { align: "right" });
    doc.moveDown(0.15);
    doc
      .font("Times-Roman")
      .fontSize(10)
      .text("Dr. Mey Dian Intan Sari", { align: "right" });
    doc.moveDown(1);

    // Gambar tabel Persediaan
    const startX = 40;
    let y = doc.y;
    const rowH = 14;

    doc.font("Times-Bold").fontSize(11);
    ["No", "Produk", "Merek", "Kode", "Stok"].forEach((label, i) => {
      const x = startX + [0, 60, 220, 320, 380][i];
      doc.text(label, x, y);
    });
    y += rowH;
    doc
      .moveTo(startX, y - 4)
      .lineTo(555, y - 4)
      .stroke();

    doc.font("Times-Roman").fontSize(10);
    persediaan.forEach((item, i) => {
      const vals = [i + 1, item.nama, item.merk, item.kodeProduk, item.stok];
      vals.forEach((v, j) => {
        const x = startX + [0, 60, 220, 320, 380][j];
        const widths = [20, 150, 100, 60, 50];
        doc.text(v.toString(), x, y, { width: widths[j] });
      });
      y += rowH;
    });

    // Jeda sebelum tabel laba
    y += rowH;

    // Gambar tabel Laba
    doc.font("Times-Bold").fontSize(11);
    ["No", "Produk", "Merek", "H.Modal", "H.Jual", "Total"].forEach(
      (label, i) => {
        const x = startX + [0, 40, 200, 300, 380, 460][i];
        doc.text(label, x, y);
      }
    );
    y += rowH;
    doc
      .moveTo(startX, y - 4)
      .lineTo(535 + 20, y - 4)
      .stroke();

    doc.font("Times-Roman").fontSize(10);
    labaList.forEach((item, i) => {
      const total = item.produkKeluar.reduce((s, t) => s + t.keuntungan, 0);
      const vals = [
        i + 1,
        item.nama,
        item.merk,
        item.hargaModal,
        item.hargaJual,
        total,
      ];
      vals.forEach((v, j) => {
        const x = startX + [0, 40, 200, 300, 380, 460][j];
        const widths = [20, 140, 90, 70, 70, 70];
        doc.text(v.toString(), x, y, { width: widths[j] });
      });
      y += rowH;
    });

    doc.end();
  } catch (error) {
    console.error("Error downloadLaporanPDF:", error);
    return res
      .status(500)
      .json({ message: "Gagal membuat PDF laporan", error: error.message });
  }
};
