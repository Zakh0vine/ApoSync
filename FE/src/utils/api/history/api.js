import axiosWithConfig from "../axiosWithConfig";

export const getHistory = async () => {
  try {
    const response = await axiosWithConfig.get("api/v1/riwayat");

    return response.data;
  } catch (error) {
    throw Error("Failed to get history");
  }
};
