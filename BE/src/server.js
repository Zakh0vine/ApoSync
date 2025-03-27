import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import "./config/passport.js"; // Konfigurasi Passport untuk SSO Google
import authRoutes from "./routes/authRoutes.js"; // Hanya import sekali
import { sequelize } from "./config/db.js"; // Koneksi database

dotenv.config(); // Load konfigurasi dari .env

const app = express();

// Middleware
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL })); // Izinkan akses dari front-end
app.use(express.json()); // Parsing request body JSON
app.use(express.urlencoded({ extended: true })); // Parsing form data

// Konfigurasi Session (Diperlukan untuk SSO Google)
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Kunci rahasia session
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // Jika menggunakan HTTPS, set secure: true
  })
);

// Middleware Passport
app.use(passport.initialize());
app.use(passport.session());

// Test API Endpoint
app.get("/", (req, res) => {
  res.send("🚀 API Aposync Berjalan!");
});

// ** Import Routes **
app.use("/auth", authRoutes); // API untuk Login & Register

// Cek koneksi ke database
sequelize
  .authenticate()
  .then(() => console.log("✅ Database terhubung!"))
  .catch((error) => console.error("❌ Database gagal terhubung:", error));

// Jalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
