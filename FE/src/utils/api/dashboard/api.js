import axiosWithConfig from "../axiosWithConfig";

export const getDailySummary = async () => {
  try {
    const response = await axiosWithConfig.get("/api/v1/dashboard");

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
