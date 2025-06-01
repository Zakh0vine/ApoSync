import * as z from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email harus diisi" })
    .email({ message: "Isi dengan format email yang benar" }),
  password: z
    .string()
    .min(1, { message: "Kata sandi harus diisi" })
    .min(6, { message: "Kata sandi harus memiliki minimal 6 karakter" }),
});
