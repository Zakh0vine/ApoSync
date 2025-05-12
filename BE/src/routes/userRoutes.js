const express = require("express");
const userController = require("../controllers/userController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

// Semua user harus login
router.use(protect);

// ❗ Hanya SUPER_ADMIN yang boleh mengakses endpoint user management
router.use(restrictTo("SUPER_ADMIN"));

router.get("/", userController.getAllUsers); // daftar user
router.get("/:id", userController.getUserById); // opsional: jika ada tampilan detail user
router.put("/:id", userController.updateUser); // edit user (hanya oleh SUPER_ADMIN)
router.patch("/:id/toggle", userController.toggleActive); // aktif/nonaktif

//Optional : Secara kacamata developer akun tidak boleh dihapus karena akun terhubung dengan riwayat pengelolaan persedian produk
router.delete("/:id", userController.deleteUser); // hapus user (jika ada di FE)

module.exports = router;
