import { useState, useEffect } from "react";
import Task from "../models/Task";
import { getAllTasks, deleteTask, updateTask, addTask } from "../services/taskApi";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      console.log("fetchTasks error", err);
    }
  };

  const handleAddTask = async (title: string, description?: string) => {
    try {
      const newTask = await addTask(title, description || "");
      setTasks(prevTasks => [
        { id: newTask.id, title: newTask.title, description: newTask.description },
        ...prevTasks,
      ]);
    } catch (error) {
      console.log("handleAddTask error", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.log("handleDeleteTask error", error);
    }
  };

  const handleUpdateTask = async (task: Task) => {
    try {
      await updateTask({ id: task.id, title: task.title, description: task.description });
      fetchTasks();
    } catch (error) {
      console.log("handleUpdateTask error", error);
    }
  };

  const handleRefreshTasks = async () => {
    try {
      fetchTasks();
    } catch (error) {
      console.log("refreshTasks error", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    fetchTasks,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleRefreshTasks,
  };
};

export default useTasks;
