// FE/src/utils/axiosWithConfig.js

import axios from "axios";
import Swal from "sweetalert2";

const axiosWithConfig = axios.create();

// Interceptor sebelum request dikirim
axiosWithConfig.interceptors.request.use((config) => {
  // Ambil token dari localStorage (jika ada)
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.baseURL = import.meta.env.VITE_APP_API_URL;
  return config;
});

// Interceptor untuk response error
axiosWithConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Jika dapat 401, bersihkan token dan user dari storage, lalu redirect ke login
      const token =
        sessionStorage.getItem("accessToken") ||
        localStorage.getItem("accessToken");
      const user =
        sessionStorage.getItem("user") || localStorage.getItem("user");

      if (token || user) {
        sessionStorage.removeItem("accessToken");
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("user");
        localStorage.removeItem("user");

        Swal.fire({
          icon: "warning",
          title: "Sesi Berakhir",
          text: "Sesi Anda telah berakhir, silakan login kembali",
        }).then(() => {
          window.location.href = "/masuk";
        });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosWithConfig;
