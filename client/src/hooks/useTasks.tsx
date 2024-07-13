import { useState, useEffect } from "react";
import Task from "../models/Task";
import { getAllTasks, deleteTask, updateTask } from "../services/taskApi";

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

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.log("handleDeleteTask error", err);
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

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    fetchTasks,
    handleUpdateTask,
    handleDeleteTask,
  };
};

export default useTasks;
