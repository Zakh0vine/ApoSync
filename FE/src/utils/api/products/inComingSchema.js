import * as z from "zod";

export const InComingSchema = z.object({
  nama: z.string().min(1, { message: "Nama produk harus diisi" }),
  hargaModal: z.number().min(1, { message: "Harga produk harus diisi" }),
  merk: z.string().min(1, { message: "Merk harus diisi" }),
  tanggalMasuk: z.string().min(1, { message: "Tanggal masuk harus diisi" }),
  kategori: z.string().min(1, { message: "Kategori harus diisi" }),
  tanggalExp: z.string().min(1, { message: "Tanggal kadaluwarsa harus diisi" }),
  kodeProduk: z.string().min(1, { message: "Kode produk harus diisi" }),
  stok: z.number().min(1, { message: "Stok harus diisi" }),
});
