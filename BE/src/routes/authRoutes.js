import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import { User } from "../models/User.js"; // Sesuaikan dengan model user
import dotenv from "dotenv";
import { requireAuth } from "../middleware/authMiddleware.js";

dotenv.config();

const router = express.Router();

// **[1] SIGN UP (REGISTER)**
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah digunakan!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Registrasi berhasil!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server.", error });
  }
});

// **[2] SIGN IN (LOGIN)**
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cek user di database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Email belum terdaftar!" });
    }

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah!" });
    }

    // Buat JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Login berhasil!", token });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server.", error });
  }
});

// **[3] GOOGLE SSO**
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback setelah login Google berhasil
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard"); // Arahkan ke dashboard setelah login sukses
  }
);
router.get("/dashboard", requireAuth, (req, res) => {
  res.json({ message: `Selamat datang, ${req.user.email}!` });
});

export default router;
