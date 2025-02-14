import axios from "axios";

const API_URL = "http://localhost:3001";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/user`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Erro ao realizar cadastro"
      );
    }
    throw new Error("Erro desconhecido ao realizar login");
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Erro ao realizar login"
      );
    }
    throw new Error("Erro desconhecido ao realizar login");
  }
};
