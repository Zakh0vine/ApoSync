import axios from "axios";
import Swal from "sweetalert2";

const axiosWithConfig = axios.create();

axiosWithConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.baseURL = "http://localhost:5000/api/v1";
  return config;
});

axiosWithConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const token =
        sessionStorage.getItem("accessToken") ||
        localStorage.getItem("accessToken");
      sessionStorage.getItem("user") || localStorage.getItem("user");

      if (token) {
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
