import express from "express";
import { login, logout } from "../controllers/authController.js";

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/logout", logout);

export default router;
