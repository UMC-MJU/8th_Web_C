import { useState } from 'react';
import styled from "styled-components";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext.jsx";

function TodoList() {
  const { todos, setTodos, doneTasks, setDoneTasks } = useContext(TodoContext);

  const completeTask = (id) => {
    const taskToComplete = todos.find((task) => task.id === id);
    setTodos(todos.filter((task) => task.id !== id));
    setDoneTasks([...doneTasks, taskToComplete]);
  };

  return (
    <RenderContainerSection>
      <RenderContainerTitle>할 일</RenderContainerTitle>
      <RenderContainerList>
        {todos.map((task) => (
            <RenderContainerItem key={task.id}>
            <RenderContainerItemText>{task.text}</RenderContainerItemText>
            <RenderContainerItemButton onClick={() => completeTask(task.id)}>
                완료
            </RenderContainerItemButton>
            </RenderContainerItem>
        ))}
       </RenderContainerList>
    </RenderContainerSection>
  );
}

export default TodoList;


const RenderContainerSection = styled.div`
  width: 100%;
  text-align: left;
`;

const RenderContainerTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
  color : #000;
`;

const RenderContainerList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// 리스트 아이템
const RenderContainerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  background: #f9f9f9;
  border-radius: 6px;
  margin-bottom: 6px;
  width: 100%;
`;

const RenderContainerItemText = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  color : #000;
`;

const RenderContainerItemButton = styled.button`
  // background-color: #dc3545;
  background-color: #28a745;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 12px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;