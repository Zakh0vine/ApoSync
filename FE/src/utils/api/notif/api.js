// FE/src/utils/api/notification/api.js

import axiosWithConfig from "../axiosWithConfig";

export const getAllNotifications = async () => {
  try {
    const response = await axiosWithConfig.get("/notifikasi");
    return response.data.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
