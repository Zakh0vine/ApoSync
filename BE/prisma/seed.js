// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const prisma = new PrismaClient();
const { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } = process.env;

async function main() {
  // Validasi jika variabel lingkungan belum diatur
  if (!SUPER_ADMIN_EMAIL || !SUPER_ADMIN_PASSWORD) {
    console.error(
      "SUPER_ADMIN_EMAIL dan SUPER_ADMIN_PASSWORD harus diatur di file .env"
    );
    process.exit(1); // Keluar dari proses jika variabel tidak ditemukan
  }

  // Pastikan password memenuhi kriteria (misalnya minimal 8 karakter)
  if (SUPER_ADMIN_PASSWORD.length < 8) {
    console.error(
      "Password untuk Super Admin harus memiliki panjang minimal 8 karakter."
    );
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(SUPER_ADMIN_PASSWORD, 10);

  try {
    // Cek apakah Super Admin sudah ada
    const superAdmin = await prisma.user.findUnique({
      where: { email: SUPER_ADMIN_EMAIL },
    });

    if (superAdmin) {
      console.log("Super Admin sudah ada, melewati pembuatan akun...");
      return;
    }

    // Jika belum ada, buat Super Admin baru
    const newSuperAdmin = await prisma.user.create({
      data: {
        name: "ADMIN GALAK",
        email: SUPER_ADMIN_EMAIL,
        password: hashedPassword,
        role: "SUPER_ADMIN",
      },
    });

    console.log("Super Admin berhasil dibuat:", newSuperAdmin);
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat Super Admin:", error);
  } finally {
    // Menutup koneksi Prisma setelah operasi selesai
    await prisma.$disconnect();
  }
}

main();
