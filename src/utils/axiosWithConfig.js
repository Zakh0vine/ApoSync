import axios from "axios";

const axiosWithConfig = axios.create();

axiosWithConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.baseURL = "http://localhost:5000";
  return config;
});

axiosWithConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Jika token expired atau tidak valid, clear token
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "/masuk";
    }
    return Promise.reject(error);
  }
);

export default axiosWithConfig;
