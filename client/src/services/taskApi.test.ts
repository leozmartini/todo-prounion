/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import api from "./apiConfig";
import { getAllTasks, addTask, updateTask, deleteTask } from "./taskApi";
import Task from "../models/Task";

vi.mock("./apiConfig");

describe("Task Service", () => {
  it("should fetch all tasks", async () => {
    const mockData = [{ id: "1", title: "Test Task", description: "Test Description" }];
    (api.get as any).mockResolvedValue({ data: mockData });

    const tasks = await getAllTasks();

    expect(api.get).toHaveBeenCalledWith("/tasks");
    expect(tasks).toEqual(mockData);
  });

  it("should add a new task", async () => {
    const mockData = { id: "1", title: "New Task", description: "New Description" };
    (api.post as any).mockResolvedValue({ data: mockData });

    const task = await addTask("New Task", "New Description");

    expect(api.post).toHaveBeenCalledWith("/tasks", {
      title: "New Task",
      description: "New Description",
    });
    expect(task).toEqual(mockData);
  });

  it("should update a task", async () => {
    const mockTask: Task = { id: "1", title: "Updated Task", description: "Updated Description" };
    (api.put as any).mockResolvedValue({ data: mockTask });

    const updatedTask = await updateTask(mockTask);

    expect(api.put).toHaveBeenCalledWith(`/tasks/${mockTask.id}`, mockTask);
    expect(updatedTask).toEqual(mockTask);
  });

  it("should delete a task", async () => {
    const mockData = { id: "1", title: "Task to Delete", description: "Description" };
    (api.delete as any).mockResolvedValue({ data: mockData });

    const deletedTask = await deleteTask("1");

    expect(api.delete).toHaveBeenCalledWith("/tasks/1");
    expect(deletedTask).toEqual(mockData);
  });
});
