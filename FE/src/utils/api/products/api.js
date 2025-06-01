import axiosWithConfig from "../axiosWithConfig";

export const getProducts = async () => {
  try {
    const response = await axiosWithConfig.get("/api/products/product");

    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error ||
      "Terjadi kesalahan saat mendapatkan produk";
    throw new Error(errorMessage);
  }
};

export const getProductId = async (id) => {
  try {
    const response = await axiosWithConfig.get(`/api/products/product/${id}`);
    return response;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error ||
      "Terjadi kesalahan saat mendapatkan id produk";
    throw new Error(errorMessage);
  }
};

export const createProduct = async (data) => {
  try {
    const newData = {
      ...data,
    };
    const response = await axiosWithConfig.post(
      "/api/products/product",
      newData
    );

    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error ||
      "Terjadi kesalahan saat membuat produk baru";
    throw new Error(errorMessage);
  }
};

export const createProductBatch = async (data) => {
  try {
    const newData = {
      ...data,
    };
    const response = await axiosWithConfig.post(
      "/api/batches/product-batches",
      newData
    );

    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error ||
      "Terjadi kesalahan saat membuat produk baru";
    throw new Error(errorMessage);
  }
};

export const updateProduct = async (data) => {
  const { id } = data;
  try {
    const newData = {
      ...data,
    };
    const response = await axiosWithConfig.put(
      `/api/products/product/${id}`,
      newData
    );

    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error || "Terjadi kesalahan saat update produk";
    throw new Error(errorMessage);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosWithConfig.delete("/api/products/product" + id);

    return response.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error || "Terjadi kesalahan saat menghapus produk";
    throw new Error(errorMessage);
  }
};
