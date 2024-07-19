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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditConfirm = async (input1Value?: string, input2Value?: string) => {
    if (input1Value || input2Value) {
      await onEdit({
        id,
        title: input1Value ?? "",
        description: input2Value ?? "",
      });
      setIsEditModalOpen(false);
    } else {
      // Handle the case where neither input1Value nor input2Value is provided
      console.log("Either title or description is required");
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await onDelete(id);
    setIsDeleteModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <TaskItemDiv onClick={() => setIsOpen(!isOpen)}>
        <div>
          <Title>{title}</Title>
          {isOpen && <Description>{description}</Description>}
        </div>
        <ButtonContainer>
          <CustomButton onClick={handleEditClick} color="blue" icon="edit" />
          <CustomButton onClick={handleDeleteClick} color="red" icon="trash" />
        </ButtonContainer>
      </TaskItemDiv>
      {isDeleteModalOpen && (
        <Modal
          title="Confirmação de Deleção"
          description="Tem certeza que deseja deletar esta tarefa?"
          buttonText="Deletar"
          buttoncolor="red"
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
      {isEditModalOpen && (
        <Modal
          title="Editar Tarefa"
          description="Edite o título e a descrição da tarefa:"
          buttonText="Salvar"
          buttoncolor="blue"
          input1="Novo Título"
          input2="Nova Descrição"
          onClose={handleCloseModal}
          onConfirm={handleEditConfirm}
        />
      )}
    </>
  );
};

export default TaskItem;
