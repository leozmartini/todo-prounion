import { Request, Response } from "express";
import { redisClient } from "../index";
import { Task } from "../models/tasks";
import { randomUUID } from "node:crypto";

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
