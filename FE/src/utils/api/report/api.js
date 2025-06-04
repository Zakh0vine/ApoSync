import axiosWithConfig from "../axiosWithConfig";

export const getReportPersediaan = async () => {
  const response = await axiosWithConfig.get("/laporan/persediaan");
  return response.data.data;
};

export const getReportLaba = async () => {
  const response = await axiosWithConfig.get("/laporan/laba");
  return response.data.data;
};

export const downloadReportPDF = async () => {
  // Tambahkan opsi responseType:'blob' agar Axios mengembalikan data sebagai Blob
  const response = await axiosWithConfig.get("/laporan/download-pdf", {
    responseType: "blob",
  });
  return response.data; // ini akan berupa Blob PDF
};
