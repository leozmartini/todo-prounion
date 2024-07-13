import React, { useState } from "react";
import { TaskItemDiv, Title, Description, ButtonContainer } from "./styles";
import CustomButton from "../CustomButton/CustomButton";
import Task from "../../models/Task";
import Modal from "../Modal/Modal";

interface TaskItemProps extends Task {
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, description, onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = async () => {
    const newTitle = prompt("Enter new title");
    const newDescription = prompt("Enter new Description");
    if (newTitle && newDescription) {
      await onEdit({ id, title: newTitle, description: newDescription });
    }
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await onDelete(id);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <TaskItemDiv onClick={() => setIsOpen(!isOpen)}>
      <div>
        <Title>{title}</Title>
        {isOpen && <Description>{description}</Description>}
      </div>
      <ButtonContainer>
        <CustomButton onClick={handleEdit} color="blue" text="E" />
        <CustomButton onClick={handleDeleteClick} color="red" text="D" />
      </ButtonContainer>
      {isModalOpen && (
        <Modal
          title="Confirmação de Deleção"
          description="Tem certeza que deseja deletar esta tarefa?"
          buttonText="Deletar"
          buttonColor="red"
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </TaskItemDiv>
  );
};

export default TaskItem;
