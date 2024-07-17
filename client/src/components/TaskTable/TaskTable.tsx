import React, { useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import { Table, ButtonContainer, TaskList, StyledH2 } from "./styles";
import CustomButton from "../CustomButton/CustomButton";
import useTasks from "../../hooks/useTasks";
import Modal from "../Modal/Modal";

const TaskTable: React.FC = () => {
  const { tasks, handleDeleteTask, handleUpdateTask, handleAddTask } = useTasks();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const onCloseModal = () => {
    setIsAddModalOpen(false);
  };

  const onAddTask = async (input1Value?: string, input2Value?: string) => {
    setIsAddModalOpen(true);
    if (input1Value && input2Value) {
      await handleAddTask(input1Value, input2Value);
      setIsAddModalOpen(false);
    }
  };

  return (
    <>
      <Table>
        <ButtonContainer>
          <StyledH2>Suas tarefas</StyledH2>
          <CustomButton onClick={onAddTask} icon="plus" color="green" />
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
      {isAddModalOpen && (
        <Modal
          title="Nova tarefa"
          description="Insira o título e a descrição da nova tarefa"
          buttonText="Adicionar"
          buttonColor="green"
          input1="Título"
          input2="Descrição"
          onClose={onCloseModal}
          onConfirm={onAddTask}
        />
      )}
    </>
  );
};

export default TaskTable;
