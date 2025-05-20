import axiosWithConfig from "../../axiosWithConfig";

export const getProducts = async () => {
  try {
    const response = await axiosWithConfig.get("/products");

    return response.data;
  } catch (error) {
    throw Error("Gagal mendapatkan produk");
  }
};

export const createProduct = async (data) => {
  try {
    const newData = {
      ...data,
    };
    const response = await axiosWithConfig.post("/products", newData);

    return response.data;
  } catch (error) {
    throw Error("Gagal membuat produk baru");
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosWithConfig.delete("/products/" + id);

    return response.data;
  } catch (error) {
    throw Error("Gagal menghapus produk");
  }
};
