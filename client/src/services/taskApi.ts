import api from "./apiConfig";

export const getAllTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("getAllTasks error:", error);
    throw error;
  }
};
