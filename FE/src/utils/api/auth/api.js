// src/utils/api/auth/api.js

import axiosWithConfig from "../axiosWithConfig";

export const login = async (email, password) => {
  try {
    const response = await axiosWithConfig.post("/auth/login", {
      email,
      password,
    });
    // response.data diharapkan: { token: string, user: { ... } }
    return response.data;
  } catch (error) {
    // Tangani error: ambil message dari server (misalnya “Email atau password salah”)
    const msg =
      error?.response?.data?.message || "Terjadi kesalahan saat mencoba login.";
    throw new Error(msg);
  }
};
