const { protect } = require("./authMiddleware");
const {
  isKaryawan,
  isKaryawanOrSuperAdmin,
  isSuperAdmin,
} = require("./authMiddleware");

const authKaryawan = [protect, isKaryawan];
const authAny = [protect, isKaryawanOrSuperAdmin];
const authSuperAdmin = [protect, isSuperAdmin];

module.exports = {
  authKaryawan,
  authAny,
  authSuperAdmin,
};
