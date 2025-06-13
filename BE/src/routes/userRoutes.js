import express from "express";
import {
  createUser,
  // deleteUser,
  toggleActive,
  updateUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Semua user harus login
router.use(protect);

// ❗ Hanya SUPER_ADMIN yang boleh mengakses endpoint user management
router.use(restrictTo("SUPER_ADMIN"));

// Dapatkan semua user (kecuali SUPER_ADMIN)
router.get("/", getAllUsers);

// Dapatkan user by ID (kecuali SUPER_ADMIN)
router.get("/:id", getUserById);

// Buat user baru (tidak bisa SUPER_ADMIN)
router.post("/", createUser);

// Update user (tidak bisa ubah role)
router.put("/:id", updateUser);

// Aktif/nonaktifkan akun
router.patch("/:id/toggle", toggleActive);

// Hapus user (jika tidak punya transaksi)
// router.delete("/:id", deleteUser);

export default router;
