import { useState, useEffect } from "react";
import Task from "../models/Task";
import { getAllTasks, deleteTask, updateTask, addTask } from "../services/taskApi";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getAllTasks();
      setTasks(fetchedTasks);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(`fetchTasks error: ${err.message}`);
    }
  };

  const handleAddTask = async (title: string, description?: string) => {
    try {
      const newTask = await addTask(title, description || "");
      setTasks(prevTasks => [
        { id: newTask.id, title: newTask.title, description: newTask.description },
        ...prevTasks,
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(`handleAddTask error: ${err.message}`);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(`handleDeleteTask error: ${err.message}`);
    }
  };

  const handleUpdateTask = async (task: Task) => {
    try {
      await updateTask({ id: task.id, title: task.title, description: task.description });
      fetchTasks();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(`handleUpdateTask error: ${err.message}`);
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
