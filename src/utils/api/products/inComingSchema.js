import * as z from "zod";

export const InComingSchema = z.object({
  nama: z.string().min(1, { message: "Nama produk harus diisi" }),
  harga: z.number().min(1, { message: "Harga produk harus diisi" }),
  merk: z.string().min(1, { message: "Merk harus diisi" }),
  tanggal_masuk: z.string().min(1, { message: "Tanggal masuk harus diisi" }),
  kategori: z.string().min(1, { message: "Kategori harus diisi" }),
  kadaluwarsa: z
    .string()
    .min(1, { message: "Tanggal kadaluwarsa harus diisi" }),
  kode: z.string().min(1, { message: "Kode produk harus diisi" }),
  stok: z.number().min(1, { message: "Stok harus diisi" }),
});
