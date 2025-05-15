import axiosWithConfig from "../../axiosWithConfig";

export const getProducts = async () => {
  try {
    const response = await axiosWithConfig.get("/products");

    return response.data;
  } catch (error) {
    throw Error("Failed to get products");
  }
};
