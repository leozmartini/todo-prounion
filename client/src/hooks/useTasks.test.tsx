/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useTasks from "./useTasks";
import * as taskApi from "../services/taskApi";
import Task from "../models/Task";

vi.mock("../services/taskApi");

const TestComponent = ({
  callback,
}: {
  callback: (tasks: ReturnType<typeof useTasks>) => void;
}) => {
  callback(useTasks());
  return null;
};

describe("useTasks", () => {
  const mockTasks: Task[] = [
    { id: "1", title: "Task 1", description: "Description 1" },
    { id: "2", title: "Task 2", description: "Description 2" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and set tasks on mount", async () => {
    (taskApi.getAllTasks as any).mockResolvedValue(mockTasks);

    let hookData: ReturnType<typeof useTasks>;

    await act(async () => {
      render(<TestComponent callback={data => (hookData = data)} />);
    });

    expect(hookData!.tasks).toEqual(mockTasks);
    expect(taskApi.getAllTasks).toHaveBeenCalled();
  });

  it("should add a new task", async () => {
    const newTask = { id: "3", title: "Task 3", description: "Description 3" };
    (taskApi.addTask as any).mockResolvedValue(newTask);
    (taskApi.getAllTasks as any).mockResolvedValue([...mockTasks, newTask]);

    let hookData: ReturnType<typeof useTasks>;

    await act(async () => {
      render(<TestComponent callback={data => (hookData = data)} />);
    });

    await act(async () => {
      hookData!.handleAddTask("Task 3", "Description 3");
    });

    expect(hookData!.tasks).toContainEqual(newTask);
    expect(taskApi.addTask).toHaveBeenCalledWith("Task 3", "Description 3");
  });

  it("should delete a task", async () => {
    (taskApi.deleteTask as any).mockResolvedValue({});
    (taskApi.getAllTasks as any).mockResolvedValue(mockTasks.slice(1));

    let hookData: ReturnType<typeof useTasks>;

    await act(async () => {
      render(<TestComponent callback={data => (hookData = data)} />);
    });

    await act(async () => {
      hookData!.handleDeleteTask("1");
    });

    expect(hookData!.tasks).toEqual(mockTasks.slice(1));
    expect(taskApi.deleteTask).toHaveBeenCalledWith("1");
  });

  it("should update a task", async () => {
    const updatedTask = { id: "1", title: "Updated Task 1", description: "Updated Description 1" };
    (taskApi.updateTask as any).mockResolvedValue(updatedTask);
    (taskApi.getAllTasks as any).mockResolvedValue([updatedTask, mockTasks[1]]);

    let hookData: ReturnType<typeof useTasks>;

    await act(async () => {
      render(<TestComponent callback={data => (hookData = data)} />);
    });

    await act(async () => {
      hookData!.handleUpdateTask(updatedTask);
    });

    expect(hookData!.tasks).toContainEqual(updatedTask);
    expect(taskApi.updateTask).toHaveBeenCalledWith(updatedTask);
  });
});
