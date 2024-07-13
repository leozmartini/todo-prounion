import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import { Table, ButtonContainer, TaskList } from "./styles";
import CustomButton from "../CustomButton/CustomButton";
import useTasks from "../../hooks/useTasks";

const TaskTable: React.FC = () => {
  const { tasks, handleDeleteTask, handleUpdateTask } = useTasks();

  return (
    <Table>
      <ButtonContainer>
        <CustomButton onClick={() => alert("Refresh")} text="R" color="blue" />
        <CustomButton onClick={() => alert("Add")} text="+" color="green" />
      </ButtonContainer>
      <TaskList>
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
      </TaskList>
    </Table>
  );
};

export default TaskTable;
