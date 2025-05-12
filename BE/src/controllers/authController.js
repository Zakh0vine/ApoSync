const bcrypt = require("bcryptjs");
const prisma = require("../../prisma/client");
const { generateToken } = require("../utils/jwt");

exports.register = async (req, res) => {
  if (!req.body) return res.status(400).json({ message: "Body kosong" });

  const { name, email, password, role } = req.body;

  try {
    // Cek role tidak boleh SUPER_ADMIN
    if (role === "SUPER_ADMIN") {
      return res
        .status(403)
        .json({
          message: "Tidak boleh membuat akun SUPER_ADMIN lewat endpoint ini",
        });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email sudah digunakan" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "KARYAWAN",
      },
    });

    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
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

    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
