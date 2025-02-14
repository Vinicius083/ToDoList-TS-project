import axios from "axios";

const API_URL = "http://localhost:3001";

export const getTasks = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Erro ao trazer tarefas do usuário"
      );
    }
    throw new Error("Erro desconhecido ao trazer tarafas do usuário");
  }
};

export const createTask = async (
  title: string,
  type: string,
  userId: string
) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, {
      title,
      type,
      userId,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao criar tarefa");
    }
    throw new Error("Erro desconhecido ao criar tarefa");
  }
};

export const updateTask = async (
  id: string,
  title: string,
  type: string,
  userId: string
) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, {
      title,
      type,
      userId,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Erro ao atualizar tarefa"
      );
    }
    throw new Error("Erro desconhecido ao atualizar tarefa");
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Erro ao deletar tarefa"
      );
    }
    throw new Error("Erro desconhecido ao deletar tarefa");
  }
};
