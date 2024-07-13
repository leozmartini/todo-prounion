import styled from "styled-components";

export const TaskItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  cursor: pointer;
`;

export const Title = styled.div`
  font-weight: bold;
`;

export const Description = styled.div`
  margin-top: 5px;
  padding-left: 10px;
`;
