// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD, SUPER_ADMIN_NAME } =
  process.env;

async function main() {
  if (!SUPER_ADMIN_EMAIL || !SUPER_ADMIN_PASSWORD) {
    console.error(
      "SUPER_ADMIN_EMAIL dan SUPER_ADMIN_PASSWORD harus diatur di file .env"
    );
    process.exit(1);
  }

  if (SUPER_ADMIN_PASSWORD.length < 8) {
    console.error(
      "Password untuk Super Admin harus memiliki panjang minimal 8 karakter."
    );
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(SUPER_ADMIN_PASSWORD, 10);

  try {
    const superAdmin = await prisma.user.findUnique({
      where: { email: SUPER_ADMIN_EMAIL },
    });

    if (superAdmin) {
      console.log("Super Admin sudah ada, melewati pembuatan akun...");
      return;
    }

    const newSuperAdmin = await prisma.user.create({
      data: {
        name: SUPER_ADMIN_NAME,
        email: SUPER_ADMIN_EMAIL,
        password: hashedPassword,
        role: "SUPER_ADMIN",
      },
    });

    console.log("Super Admin berhasil dibuat:", newSuperAdmin);
  } catch (error) {
    console.error("Terjadi kesalahan saat membuat Super Admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
