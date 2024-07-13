import React from "react";
import { StyledHeader } from "./styles";

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <div className="left-image">
        <img src="/logo-prounion.png" alt="Imagem Horizontal" />
      </div>
      <div className="title">
        <h1>Desafio 01: Aplicação de Lista de Tarefas (To-Do List)</h1>
      </div>
      <a href="https://github.com/leozmartini/todo-prounion" className="right-image">
        <img src="/github.png" alt="Imagem Quadrada" />
      </a>
    </StyledHeader>
  );
};

export default Header;
