import axiosWithConfig from "../axiosWithConfig";

export const getHistory = async () => {
  try {
    const response = await axiosWithConfig.get("/riwayat");

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
