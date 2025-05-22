const express = require("express");
const userController = require("../controllers/userController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

// Semua user harus login
router.use(protect);

// ❗ Hanya SUPER_ADMIN yang boleh mengakses endpoint user management
router.use(restrictTo("SUPER_ADMIN"));

// Dapatkan semua user (kecuali SUPER_ADMIN)
router.get("/", userController.getAllUsers);

// Dapatkan user by ID (kecuali SUPER_ADMIN)
router.get("/:id", userController.getUserById);

// Buat user baru (tidak bisa SUPER_ADMIN)
router.post("/", userController.createUser);

// Update user (tidak bisa ubah role)
router.put("/:id", userController.updateUser);

// Aktif/nonaktifkan akun
router.patch("/:id/toggle", userController.toggleActive);

// Hapus user (jika tidak punya transaksi)
router.delete("/:id", userController.deleteUser);

module.exports = router;
