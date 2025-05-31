// controllers/laporanController.js

import { PrismaClient, StatusKeluar } from "@prisma/client";
import PDFDocument from "pdfkit";

const prisma = new PrismaClient();

/**
 * Utility: Gambar header tabel (kolom-kolom) pada posisi tertentu
 *
 * @param {PDFDocument} doc    - instance PDFKit
 * @param {number}    y        - posisi vertikal (y) untuk mulai menggambar header
 * @param {Array<{label: string, x: number, width: number}>} columns
 *                              - array definisi kolom: label teks, posisi x, dan lebar kolom
 */
function drawTableHeader(doc, y, columns) {
  doc.font("Helvetica-Bold").fontSize(12);
  columns.forEach((col) => {
    doc.text(col.label, col.x, y, {
      width: col.width,
      align: "left",
    });
  });

  doc
    .moveTo(columns[0].x, y + 15)
    .lineTo(
      columns[columns.length - 1].x + columns[columns.length - 1].width,
      y + 15
    )
    .stroke();
}

/**
 * Utility: Gambar satu baris data pada posisi tertentu
 *
 * @param {PDFDocument} doc    - instance PDFKit
 * @param {number}    y        - posisi vertikal (y) untuk mulai menggambar baris
 * @param {Array<{text: string|number, x: number, width: number}>} row
 *                              - array data baris: isi teks, posisi x, dan lebar kolom
 */
function drawTableRow(doc, y, row) {
  doc.font("Helvetica").fontSize(10);
  row.forEach((cell) => {
    doc.text(cell.text.toString(), cell.x, y, {
      width: cell.width,
      align: "left",
    });
  });
}

export const getLaporanPersediaan = async (req, res) => {
  try {
    const produk = await prisma.produk.findMany({
      select: {
        nama: true,
        merk: true,
        kodeProduk: true,
        stok: true,
      },
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
      .json({ message: "Gagal mengambil data persediaan", error });
  }
};

export const getLaporanLaba = async (req, res) => {
  try {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 29);

    const produkList = await prisma.produk.findMany({
      select: {
        nama: true,
        merk: true,
        hargaModal: true,
        hargaJual: true,
        produkKeluar: {
          where: {
            status: StatusKeluar.TERJUAL,
            tanggalKeluar: {
              gte: lastMonth,
              lte: today,
            },
          },
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
      .json({ message: "Gagal mengambil data laba", error });
  }
};

export const downloadLaporanPDF = async (req, res) => {
  try {
    const persediaan = await prisma.produk.findMany({
      select: {
        nama: true,
        merk: true,
        kodeProduk: true,
        stok: true,
      },
      orderBy: { nama: "asc" },
    });

    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 29);

    const labaList = await prisma.produk.findMany({
      select: {
        nama: true,
        merk: true,
        hargaModal: true,
        hargaJual: true,
        produkKeluar: {
          where: {
            status: StatusKeluar.TERJUAL,
            tanggalKeluar: {
              gte: lastMonth,
              lte: today,
            },
          },
          select: { keuntungan: true },
        },
      },
      orderBy: { nama: "asc" },
    });

    const doc = new PDFDocument({ size: "A4", margin: 40 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="laporan.pdf"');
    doc.pipe(res);

    doc
      .font("Helvetica-Bold")
      .fontSize(18)
      .text("Laporan Persediaan & Laba Keuntungan", {
        align: "center",
      });
    doc.moveDown(1);

    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Persediaan Produk", 40, doc.y, {
        underline: true,
        align: "left",
      });
    doc.moveDown(0.5);

    const persediaanColumns = [
      { label: "No", x: 40, width: 30 },
      { label: "Nama Produk", x: 80, width: 150 },
      { label: "Merek", x: 240, width: 100 },
      { label: "Kode", x: 350, width: 80 },
      { label: "Total Stok", x: 440, width: 80 },
    ];

    let y = doc.y;
    drawTableHeader(doc, y, persediaanColumns);
    y += 20;

    for (let i = 0; i < persediaan.length; i++) {
      const item = persediaan[i];
      const row = [
        {
          text: i + 1,
          x: persediaanColumns[0].x,
          width: persediaanColumns[0].width,
        },
        {
          text: item.nama,
          x: persediaanColumns[1].x,
          width: persediaanColumns[1].width,
        },
        {
          text: item.merk,
          x: persediaanColumns[2].x,
          width: persediaanColumns[2].width,
        },
        {
          text: item.kodeProduk,
          x: persediaanColumns[3].x,
          width: persediaanColumns[3].width,
        },
        {
          text: item.stok,
          x: persediaanColumns[4].x,
          width: persediaanColumns[4].width,
        },
      ];
      drawTableRow(doc, y, row);
      y += 20;

      if (y > doc.page.height - 100) {
        doc.addPage();
        y = doc.y;
      }
    }

    doc.moveDown(2);

    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Laba Keuntungan 30 hari terakhir", 40, doc.y, {
        underline: true,
        align: "left",
      });
    doc.moveDown(0.5);

    const labaColumns = [
      { label: "No", x: 40, width: 30 },
      { label: "Nama Produk", x: 80, width: 150 },
      { label: "Merek", x: 240, width: 100 },
      { label: "Harga Modal", x: 350, width: 80 },
      { label: "Harga Jual", x: 440, width: 80 },
      { label: "Total Laba", x: 530, width: 80 },
    ];

    y = doc.y;
    drawTableHeader(doc, y, labaColumns);
    y += 20;

    for (let i = 0; i < labaList.length; i++) {
      const item = labaList[i];
      const totalLaba = item.produkKeluar.reduce((s, t) => s + t.keuntungan, 0);

      const row = [
        { text: i + 1, x: labaColumns[0].x, width: labaColumns[0].width },
        { text: item.nama, x: labaColumns[1].x, width: labaColumns[1].width },
        { text: item.merk, x: labaColumns[2].x, width: labaColumns[2].width },
        {
          text: item.hargaModal,
          x: labaColumns[3].x,
          width: labaColumns[3].width,
        },
        {
          text: item.hargaJual,
          x: labaColumns[4].x,
          width: labaColumns[4].width,
        },
        { text: totalLaba, x: labaColumns[5].x, width: labaColumns[5].width },
      ];
      drawTableRow(doc, y, row);
      y += 20;

      if (y > doc.page.height - 100) {
        doc.addPage();
        y = doc.y;
      }
    }

    const bottomMargin = 40;
    const footerY = doc.page.height - bottomMargin;

    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yyyy = now.getFullYear();
    const formattedDate = `${dd}-${mm}-${yyyy}`;

    doc
      .font("Helvetica")
      .fontSize(10)
      .text(`Tanggal Unduh: ${formattedDate}`, 40, footerY - 20, {
        align: "right",
        width: doc.page.width - 80,
      });

    doc
      .font("Helvetica")
      .fontSize(10)
      .text(`Dr. Mey Dian Intansari`, 40, footerY, {
        align: "right",
        width: doc.page.width - 80,
      });

    doc.end();
  } catch (error) {
    console.error("Error downloadLaporanPDF:", error);
    return res
      .status(500)
      .json({ message: "Gagal membuat PDF laporan", error });
  }
};
