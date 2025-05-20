import axiosWithConfig from "../../axiosWithConfig";

export const getReport = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://68260c30397e48c91314c76a.mockapi.io/api/report"
    );

    return response.data;
  } catch (error) {
    throw Error("Gagal mendapatkan laporan");
  }
};
