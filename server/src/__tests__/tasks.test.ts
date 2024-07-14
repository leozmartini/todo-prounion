import { Request, Response } from "express";
import { redisClient } from "../mocks/redisMock";
import { getTasks, addTask, updateTask, deleteTask } from "../controllers/tasks";

jest.mock("../index", () => ({
  redisClient,
}));

describe("Tasks Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
      send: jest.fn().mockImplementation(() => {
        responseObject = {};
      }),
      end: jest.fn().mockImplementation(() => {
        responseObject = {};
      }),
    };
  });

  it("should return empty tasks array", async () => {
    redisClient.keys = jest.fn().mockResolvedValue([]);
    await getTasks(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject).toEqual([]);
  });

  it("should add a new task", async () => {
    mockRequest.body = { title: "Test Task", description: "Test Description" };
    await addTask(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(responseObject.title).toBe("Test Task");
  });

  it("should update a task", async () => {
    const task = {
      id: "1",
      title: "Old Task",
      description: "Old Description",
      timestamp: Date.now(),
    };
    redisClient.get = jest.fn().mockResolvedValue(JSON.stringify(task));
    mockRequest.params = { id: "1" };
    mockRequest.body = { title: "Updated Task", description: "Updated Description" };
    await updateTask(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject.title).toBe("Updated Task");
  });

  it("should delete a task", async () => {
    const task = { id: "1", title: "Task", description: "Description", timestamp: Date.now() };
    redisClient.get = jest.fn().mockResolvedValue(JSON.stringify(task));
    mockRequest.params = { id: "1" };
    await deleteTask(mockRequest as Request, mockResponse as Response);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
  });
});
