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
