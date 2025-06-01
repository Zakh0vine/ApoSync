import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt.js";
const prisma = new PrismaClient();

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password wajib diisi" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Email tidak ditemukan" });

    if (!user.isActive) {
      return res
        .status(403)
        .json({ message: "Akun dinonaktifkan. Hubungi admin." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = generateToken(userWithoutPassword);

    res.json({
      user: userWithoutPassword,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Terjadi kesalahan saat login" });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  res.status(200).json({ message: "Berhasil logout (hapus token di client)" });
};
