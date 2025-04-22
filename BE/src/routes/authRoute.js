// src/routes/authRoute.js
const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");

const router = express.Router();

// Google SSO
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Bawa token ke frontend
    res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${req.user.token}`);
  }
);

// Manual login/register
router.post("/register", authController.register);
router.post("/login", authController.login);

// Logout
router.get("/logout", authController.logout);

module.exports = router;
