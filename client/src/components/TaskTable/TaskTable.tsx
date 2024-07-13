import React, { useEffect, useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import Task from "../../models/Task";
import { Table } from "./styles";
import { getAllTasks } from "../../services/taskApi";

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      setTasks(await getAllTasks());
    })();
  }, []);

  return (
    <Table>
      {tasks.map((task, index) => (
        <TaskItem key={index} title={task.title} description={task.description} />
      ))}
    </Table>
  );
};

export default TaskTable;
