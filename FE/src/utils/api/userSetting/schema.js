import * as z from "zod";

export const UserSchema = z
  .object({
    name: z.string().min(1, { message: "Nama harus diisi" }),
    email: z
      .string()
      .min(1, { message: "Email harus diisi" })
      .email({ message: "Isi dengan format email yang benar" }),
    role: z.string().min(1, { message: "Role harus diisi" }),
    password: z.string().min(6, { message: "Password minimal 6 karakter" }),
    konfirmasi_password: z
      .string()
      .min(6, { message: "Konfirmasi password minimal 6 karakter" }),
  })
  .refine((data) => data.password === data.konfirmasi_password, {
    message: "Password dan konfirmasi password tidak cocok",
    path: ["konfirmasi_password"],
  });
