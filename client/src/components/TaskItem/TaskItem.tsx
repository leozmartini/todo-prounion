import React, { useState } from "react";
import { TaskItemDiv, Title, Description, ButtonContainer } from "./styles";
import CustomButton from "../CustomButton/CustomButton";

interface TaskItemProps {
  title: string;
  description: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TaskItemDiv onClick={() => setIsOpen(!isOpen)}>
      <div>
        <Title>{title}</Title>
        {isOpen && <Description>{description}</Description>}
      </div>
      <ButtonContainer>
        <CustomButton onClick={() => alert("Edit")} color="blue" text="E" />
        <CustomButton onClick={() => alert("Delete")} color="red" text="D" />
      </ButtonContainer>
    </TaskItemDiv>
  );
};

export default TaskItem;
