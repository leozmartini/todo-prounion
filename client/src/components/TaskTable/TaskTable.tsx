import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import { Table } from "./styles";
import useTasks from "../../hooks/useTasks";

const TaskTable: React.FC = () => {
  const { tasks, handleDeleteTask, handleUpdateTask } = useTasks();

  return (
    <Table>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description || ""}
          onDelete={handleDeleteTask}
          onEdit={handleUpdateTask}
        />
      ))}
    </Table>
  );
};

export default TaskTable;
