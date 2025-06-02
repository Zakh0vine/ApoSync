// FE/src/utils/api/report/api.js

import axiosWithConfig from "../axiosWithConfig";

export const getReportPersediaan = async () => {
  const response = await axiosWithConfig.get("/api/v1/laporan/persediaan");
  return response.data.data;
};

export const getReportLaba = async () => {
  const response = await axiosWithConfig.get("/api/v1/laporan/laba");
  return response.data.data;
};

export const downloadReportPDF = async () => {
  const response = await axiosWithConfig.get("/api/v1/laporan/download-pdf");
};
