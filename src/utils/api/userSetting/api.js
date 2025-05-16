import axiosWithConfig from "../../axiosWithConfig";

export const getUser = async () => {
  try {
    const response = await axiosWithConfig.get(
      "https://68260c30397e48c91314c76a.mockapi.io/api/user_setting"
    );

    return response.data;
  } catch (error) {
    throw Error("Failed to get user setting");
  }
};

export const updateUser = async (data) => {
  const { id } = data;
  try {
    const newData = {
      ...data,
    };
    const response = await axiosWithConfig.put(
      `https://68260c30397e48c91314c76a.mockapi.io/api/user_setting/${id}`,
      newData
    );

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
