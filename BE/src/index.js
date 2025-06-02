import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productMasukRoutes from "./routes/productMasukRoutes.js";
import productKeluarRoutes from "./routes/productKeluarRoutes.js";
import laporanRoutes from "./routes/laporanRoutes.js";
import riwayatRoutes from "./routes/riwayatRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// Load environment variables
dotenv.config();

// App setup
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Middleware
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/produkin", productMasukRoutes);
app.use("/api/v1/produkout", productKeluarRoutes);
app.use("/api/v1/laporan", laporanRoutes);
app.use("/api/v1/riwayat", riwayatRoutes);
app.use("/api/v1/notifikasi", notificationRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Health checks
app.get("/", (req, res) => {
  res.send("🚀 Apotek Backend API is running.");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
