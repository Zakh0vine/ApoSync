import * as z from "zod";

export const InComingSchema = z.object({
  name: z.string().min(1, { message: "Nama produk harus diisi" }),
  price: z.number().min(1, { message: "Harga produk harus diisi" }),
  brand: z.string().min(1, { message: "Merk harus diisi" }),
  entryDate: z.string().min(1, { message: "Tanggal masuk harus diisi" }),
  category: z.string().min(1, { message: "Kategori harus diisi" }),
  expiredDate: z
    .string()
    .min(1, { message: "Tanggal kadaluwarsa harus diisi" }),
  code: z.string().min(1, { message: "Kode produk harus diisi" }),
  stock: z.number().min(1, { message: "Stok harus diisi" }),
});
