// src/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../prisma/client");
const { generateToken } = require("../utils/jwt");

exports.register = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Body kosong" });
  }
  const { name, email, password, role, branchId } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already used" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        branchId,
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
    if (
      !user ||
      (password && !(await bcrypt.compare(password, user.password)))
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.googleCallback = (req, res) => {
  const { user, token } = req.user;
  res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect(process.env.CLIENT_URL);
  });
};
