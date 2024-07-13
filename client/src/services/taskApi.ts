import Task from "../models/Task";
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

export const updateTask = async (task: Task) => {
  try {
    const response = await api.put(`/tasks/${task.id}`, task);
    return response.data;
  } catch (error) {
    console.error("updateTask error:", error);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("deleteTask error:", error);
  }
};
