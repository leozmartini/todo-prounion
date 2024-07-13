import { Request, Response } from "express";
import { redisClient } from "../index";
import { Task } from "../models/tasks";
import { randomUUID } from "node:crypto";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const keys = await redisClient.keys("*");
    const tasks: Task[] = [];
    for (const key of keys) {
      const task = await redisClient.get(key);
      if (task !== null) {
        tasks.push(JSON.parse(task));
      }
    }
    res.status(200).json(tasks);
  } catch (error: any) {
    console.log(`getTasks error: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }
    const newTask: Task = { id: randomUUID(), title, description };
    await redisClient.set(newTask.id, JSON.stringify(newTask));
    res.status(201).json(newTask);
  } catch (error: any) {
    console.log(`addTask error: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !id) {
      res.status(400).json({ message: "Title and ID are required" });
      return;
    }
    const task = await redisClient.get(id);
    if (task === null) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    const updatedTask: Task = { id, title, description };
    await redisClient.set(id, JSON.stringify(updatedTask));
    res.status(200).json(updatedTask);
  } catch (error: any) {
    console.log(`updateTask error: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "ID is required" });
      return;
    }
    const task = await redisClient.get(id);
    if (task === null) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    await redisClient.del(id);
    res.status(204).end();
  } catch (error: any) {
    console.log(`deleteTask error: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
