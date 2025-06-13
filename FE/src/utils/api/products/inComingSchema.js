import { z } from "zod";

export const InComingSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  merk: z.string().min(1, "Merk wajib diisi"),
  kategori: z.string().min(1, "Kategori wajib diisi"),
  kodeProduk: z.string().min(1, "Kode Produk wajib diisi"),
  hargaModal: z.number().min(1, "Harga Modal harus positif"),
  stok: z.number().min(0, "Stok minimal 0").optional(),
  sudahTermasukPPN: z.boolean(),
  tanggalMasuk: z.string().optional(),
  tanggalExp: z.string().optional(),
});
