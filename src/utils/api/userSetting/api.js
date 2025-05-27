import axiosWithConfig from "../../axiosWithConfig";

export const getUser = async () => {
  try {
    const response = await axiosWithConfig.get("/api/users");

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const toggleUser = async (id) => {
  try {
    const response = await axiosWithConfig.patch(`/api/users/${id}/toggle`);
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
    const response = await axiosWithConfig.post("/api/users", newData);

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
    const response = await axiosWithConfig.put(`/api/users/${id}`, newData);

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosWithConfig.delete("/api/users/" + id);

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
