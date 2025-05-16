import axiosWithConfig from "../../axiosWithConfig";

export const getProducts = async () => {
  try {
    const response = await axiosWithConfig.get("/products");

    return response.data;
  } catch (error) {
    throw Error("Failed to get products");
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosWithConfig.delete("/products/" + id);

    return response.data;
  } catch (error) {
    throw Error("Failed to delete a product");
  }
};
