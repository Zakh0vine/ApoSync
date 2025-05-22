// const { verifyToken } = require("../utils/jwt");

// exports.protect = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

//   if (!token)
//     return res
//       .status(401)
//       .json({ message: "Akses ditolak, token tidak tersedia" });

//   try {
//     const decoded = verifyToken(token);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Token tidak valid" });
//   }
// };

// exports.restrictTo = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res
//         .status(403)
//         .json({ message: "Akses ditolak: role tidak diizinkan" });
//     }
//     next();
//   };
// };

const { verifyToken } = require("../utils/jwt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Middleware: Proteksi awal dan pengecekan user aktif
exports.protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // format: Bearer <token>

  if (!token) {
    return res
      .status(401)
      .json({ message: "Akses ditolak, token tidak tersedia" });
  }

  try {
    const decoded = verifyToken(token); // menggunakan utils/jwt.js
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user || !user.isActive) {
      return res
        .status(403)
        .json({ message: "Akun tidak aktif atau tidak ditemukan" });
    }

    req.user = user; // menyimpan user dari DB agar info role & isActive terbaru
    next();
  } catch (error) {
    console.error("Token error:", error);
    return res.status(401).json({ message: "Token tidak valid" });
  }
};

// Middleware: Role-based access control fleksibel
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Akses ditolak: role tidak diizinkan" });
    }
    next();
  };
};

// Middleware: Spesifik hanya untuk role KARYAWAN
exports.isKaryawan = (req, res, next) => {
  if (req.user.role !== "KARYAWAN") {
    return res
      .status(403)
      .json({ message: "Akses ditolak: hanya untuk KARYAWAN" });
  }
  next();
};

// Middleware: Spesifik hanya untuk role SUPER_ADMIN
exports.isSuperAdmin = (req, res, next) => {
  if (req.user.role !== "SUPER_ADMIN") {
    return res
      .status(403)
      .json({ message: "Akses ditolak: hanya untuk SUPER_ADMIN" });
  }
  next();
};

// Middleware: Untuk role KARYAWAN atau SUPER_ADMIN
exports.isKaryawanOrSuperAdmin = (req, res, next) => {
  if (req.user.role !== "KARYAWAN" && req.user.role !== "SUPER_ADMIN") {
    return res
      .status(403)
      .json({ message: "Akses ditolak: role tidak memenuhi syarat" });
  }
  next();
};
