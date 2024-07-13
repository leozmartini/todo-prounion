import { Request, Response } from "express";
import { redisClient } from "../index";
import { Task } from "../models/tasks";

export const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }
    const newTask: Task = { id: "test", title, description };
    await redisClient.set("test", JSON.stringify(newTask));
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
