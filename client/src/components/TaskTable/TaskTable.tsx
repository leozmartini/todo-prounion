import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import Task from "../../models/Task";
import { Table } from "./styles";

const tasks: Task[] = [
  { title: "Task 1", description: "desc" },
  { title: "Task 2", description: "desc" },
  { title: "Task 3", description: "desc" },
];

const TaskTable: React.FC = () => {
  return (
    <Table>
      {tasks.map((task, index) => (
        <TaskItem key={index} title={task.title} description={task.description} />
      ))}
    </Table>
  );
};

export default TaskTable;
