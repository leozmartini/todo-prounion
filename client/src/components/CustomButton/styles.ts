import styled from "styled-components";

export const Button = styled.button<{ buttonColor?: string }>`
  background-color: ${({ buttonColor }) => buttonColor || "black"};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
`;
