import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

// Util untuk validasi email
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Mendapatkan semua users (tanpa SUPER_ADMIN)
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: { not: "SUPER_ADMIN" } }, // ❗ filter di sini
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mendapatkan daftar user" });
  }
};

// Mendapatkan user by ID (tanpa SUPER ADMIN)
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user || user.role === "SUPER_ADMIN") {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mendapatkan detail user" });
  }
};

// Update user (tidak bisa ubah role, validasi email)
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser || existingUser.role === "SUPER_ADMIN") {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const updateData = {
      name: name || existingUser.name,
      email: email || existingUser.email,
    };

    if (email && !isValidEmail(email)) {
      return res.status(400).json({ message: "Format email tidak valid" });
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          message: "Password minimal 6 karakter",
        });
      }
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      message: "User berhasil diupdate",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }
    res.status(500).json({ message: "Gagal mengupdate user" });
  }
};

// Toggle aktif/nonaktif
export const toggleActive = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user || user.role === "SUPER_ADMIN") {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { isActive: !user.isActive },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    const statusMessage = updatedUser.isActive
      ? "User berhasil diaktifkan"
      : "User berhasil dinonaktifkan";

    res.status(200).json({
      message: statusMessage,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengubah status user" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user || user.role === "SUPER_ADMIN") {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const userTransactions = await prisma.productTransaction.findMany({
      where: { userId: parseInt(id) },
    });

    if (userTransactions.length > 0) {
      return res.status(400).json({
        message: "User tidak dapat dihapus karena memiliki riwayat transaksi",
      });
    }

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "User berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus user" });
  }
};

// Buat user baru (untuk SUPER_ADMIN)
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Nama, email, dan password wajib diisi" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Format email tidak valid" });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password minimal 6 karakter",
    });
  }

  if (role === "SUPER ADMIN") {
    return res.status(403).json({
      message: "Tidak diizinkan membuat akun dengan role SUPER ADMIN",
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "KARYAWAN",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({
      message: "User berhasil dibuat",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal membuat user baru" });
  }
};
