import axiosWithConfig from "../axiosWithConfig";

export const login = async (email, password) => {
  try {
    const response = await axiosWithConfig.post(`/auth/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
