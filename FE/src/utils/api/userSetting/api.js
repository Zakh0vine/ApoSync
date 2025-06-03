import axiosWithConfig from "../axiosWithConfig";

export const getUser = async () => {
  try {
    const response = await axiosWithConfig.get("/users");

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const getUserId = async (id) => {
  try {
    const response = await axiosWithConfig.get(`/users/${id}`);
    return response;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const toggleUser = async (id) => {
  try {
    const response = await axiosWithConfig.patch(`/users/${id}/toggle`);
    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const createUser = async (data) => {
  try {
    const newData = {
      ...data,
    };
    const response = await axiosWithConfig.post("/users", newData);

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const updateUser = async (data) => {
  const { id } = data;
  try {
    const newData = {
      ...data,
    };
    const response = await axiosWithConfig.put(`/users/${id}`, newData);

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosWithConfig.delete("/users/${id}" + id);

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
