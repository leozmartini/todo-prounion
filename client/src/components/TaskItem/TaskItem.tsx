import React, { useState } from "react";
import { TaskItemDiv, Title, Description, ButtonContainer } from "./styles";
import CustomButton from "../CustomButton/CustomButton";
import Task from "../../models/Task";

interface TaskItemProps extends Task {
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, description, onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = async () => {
    const newTitle = prompt("Enter new title");
    const newDescription = prompt("Enter new Description");
    if (newTitle && newDescription) {
      await onEdit({ id, title: newTitle, description: newDescription });
    }
  };

  const handleDelete = async () => {
    await onDelete(id);
  };

  return (
    <TaskItemDiv onClick={() => setIsOpen(!isOpen)}>
      <div>
        <Title>{title}</Title>
        {isOpen && <Description>{description}</Description>}
      </div>
      <ButtonContainer>
        <CustomButton onClick={handleEdit} color="blue" text="E" />
        <CustomButton onClick={handleDelete} color="red" text="D" />
      </ButtonContainer>
    </TaskItemDiv>
  );
};

export default TaskItem;
