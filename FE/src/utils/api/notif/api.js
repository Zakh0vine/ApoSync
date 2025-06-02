// FE/src/utils/api/notification/api.js

import axiosWithConfig from "../axiosWithConfig";

export const getAllNotifications = async () => {
  try {
    const response = await axiosWithConfig.get("/api/v1/notifikasi");
    // Backend mengembalikan { data: [ … ] }
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Gagal memuat notifikasi");
  }
};
