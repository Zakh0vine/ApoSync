const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Import routes
const authRoute = require("./routes/authRoute");
const productRoutes = require("./routes/productRoutes");
const productBatchRoutes = require("./routes/productBatchRoutes");
const productTransactionRoutes = require("./routes/productTransactionRoutes");
const userRoutes = require("./routes/userRoutes");

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
app.use("/auth", authRoute);
app.use("/api/products", productRoutes);
app.use("/api/batches", productBatchRoutes);
app.use("/api/transactions", productTransactionRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Apotek Backend API is running.");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is listening at http://localhost:${PORT}`);
});
