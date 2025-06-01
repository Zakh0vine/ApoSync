import axiosWithConfig from "../axiosWithConfig";

export const getReport = async () => {
  try {
    const response = await axiosWithConfig.get(
      "api/transactions/product-transactions"
    );

    return response.data;
  } catch (error) {
    throw Error("Gagal mendapatkan laporan");
  }
};
