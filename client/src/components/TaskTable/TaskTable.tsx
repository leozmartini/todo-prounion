import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import { Table, ButtonContainer, TaskList } from "./styles";
import CustomButton from "../CustomButton/CustomButton";
import useTasks from "../../hooks/useTasks";

const TaskTable: React.FC = () => {
  const { tasks, handleDeleteTask, handleUpdateTask, handleAddTask, handleRefreshTasks } =
    useTasks();

  const onAddTask = async () => {
    const title = prompt("Enter title");
    const description = prompt("Enter description");
    if (title) {
      await handleAddTask(title, description || "");
    }
  };

  const onRefresh = async () => {
    await handleRefreshTasks();
  };

  return (
    <Table>
      <ButtonContainer>
        <CustomButton onClick={onRefresh} text="R" color="blue" />
        <CustomButton onClick={onAddTask} text="+" color="green" />
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
