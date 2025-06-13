import { verifyToken } from "../utils/jwt.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Akses ditolak, token tidak tersedia" });
  }

  try {
    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user || !user.isActive) {
      return res
        .status(403)
        .json({ message: "Akun tidak aktif atau tidak ditemukan" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token error:", error);
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Akses ditolak: role tidak diizinkan" });
    }
    next();
  };
};

export const isKaryawan = (req, res, next) => {
  if (req.user.role !== "KARYAWAN") {
    return res
      .status(403)
      .json({ message: "Akses ditolak: hanya untuk KARYAWAN" });
  }
  next();
};

export const isSuperAdmin = (req, res, next) => {
  if (req.user.role !== "SUPER_ADMIN") {
    return res
      .status(403)
      .json({ message: "Akses ditolak: hanya untuk SUPER ADMIN" });
  }
  next();
};

export const isKaryawanOrSuperAdmin = (req, res, next) => {
  if (req.user.role !== "KARYAWAN" && req.user.role !== "SUPER_ADMIN") {
    return res
      .status(403)
      .json({ message: "Akses ditolak: role tidak memenuhi syarat" });
  }
  next();
};
