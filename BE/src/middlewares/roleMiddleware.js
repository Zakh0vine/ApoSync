import { protect } from "./authMiddleware.js";
import {
  isKaryawan,
  isKaryawanOrSuperAdmin,
  isSuperAdmin,
} from "./authMiddleware.js";

export const authKaryawan = [protect, isKaryawan];
export const authAny = [protect, isKaryawanOrSuperAdmin];
export const authSuperAdmin = [protect, isSuperAdmin];
