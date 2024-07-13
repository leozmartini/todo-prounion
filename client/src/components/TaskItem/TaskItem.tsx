import React, { useState } from "react";
import { TaskItemDiv, Title, Description } from "./styles";

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
    </TaskItemDiv>
  );
};

export default TaskItem;
