import axiosWithConfig from "../axiosWithConfig";

export const getDailySummary = async () => {
  try {
    const response = await axiosWithConfig.get(
      "/api/transactions/product-transactions/daily-summary"
    );

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
