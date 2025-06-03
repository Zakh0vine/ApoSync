import * as z from "zod";

export const outComingSchema = z.object({
  nama: z.string().min(1, { message: "Nama produk harus diisi" }),
  harga: z.number().min(1, { message: "Harga produk harus diisi" }),
  merk: z.string().min(1, { message: "Merk harus diisi" }),
  tanggalKeluar: z.string().min(1, { message: "Tanggal keluar harus diisi" }),
  kategori: z.string().min(1, { message: "Kategori harus diisi" }),
  kodeProduk: z.string().min(1, { message: "Kode produk harus diisi" }),
  stok: z.number().min(1, { message: "Stok harus diisi" }),
  status: z.string().min(1, { message: "Status harus diisi" }),
});
