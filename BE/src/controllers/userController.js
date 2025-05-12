const prisma = require("../../prisma/client");
const bcrypt = require("bcryptjs");

// Ambil semua user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ambil user berdasarkan ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  // Validasi: pastikan ID adalah angka
  if (isNaN(userId)) {
    return res.status(400).json({ message: "ID user harus berupa angka." });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { name, email, role, password } = req.body;

  try {
    const targetUser = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!targetUser) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const currentUserRole = req.user.role;

    // Tidak boleh ubah role SUPER_ADMIN
    if (targetUser.role === "SUPER_ADMIN" && role && role !== "SUPER_ADMIN") {
      return res.status(403).json({
        message: "Anda tidak dapat mengubah role user SUPER_ADMIN.",
      });
    }

    // Hanya SUPER_ADMIN yang boleh mengubah role user lain
    if (role && targetUser.role !== role) {
      if (currentUserRole !== "SUPER_ADMIN") {
        return res.status(403).json({
          message: "Hanya SUPER_ADMIN yang dapat mengubah role pengguna.",
        });
      }
    }

    const updateData = { name, email };

    if (role) {
      updateData.role = role;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: updateData,
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Aktifkan/nonaktifkan user
// Aktifkan/nonaktifkan user
exports.toggleActive = async (req, res) => {
  try {
    const currentUser = req.user; // dari middleware
    const targetUser = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!targetUser) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Tidak boleh menonaktifkan/aktifkan akun SUPER_ADMIN
    if (targetUser.role === "SUPER_ADMIN") {
      return res.status(403).json({
        message: "Akun SUPER_ADMIN tidak dapat diaktifkan/dinonaktifkan.",
      });
    }

    // Hanya SUPER_ADMIN yang boleh toggle user lain
    if (currentUser.role !== "SUPER_ADMIN") {
      return res.status(403).json({
        message: "Hanya SUPER_ADMIN yang dapat mengubah status aktif pengguna.",
      });
    }

    const updated = await prisma.user.update({
      where: { id: targetUser.id },
      data: { isActive: !targetUser.isActive },
    });

    res.json({
      message: `User telah ${
        updated.isActive ? "diaktifkan" : "dinonaktifkan"
      }`,
      user: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Hapus user (tambahan baru)
exports.deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    if (user.role === "SUPER_ADMIN") {
      return res.status(403).json({
        message: "Akun SUPER_ADMIN tidak boleh dihapus.",
      });
    }

    await prisma.user.delete({ where: { id: user.id } });

    res.json({ message: "User berhasil dihapus." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
