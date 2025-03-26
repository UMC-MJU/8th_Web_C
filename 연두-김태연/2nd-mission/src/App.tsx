import { useState } from 'react';
import './App.css';
import { TodoProvider } from "./context/TodoContext.jsx";
import styled from "styled-components";
// component 분리
import TodoList from './component/TodoList';
import TodoInput from './component/TodoInput';
import DoneList from './component/DoneList';

function App() {
  return (
    <TodoProvider>
      <TodoContainer>
        <TodoInput />
        <RenderContainer>
          <TodoList />
          <DoneList />
        </RenderContainer>
       
      </TodoContainer>
       
    </TodoProvider>
  );
}

export default App;

const TodoContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background :#fff;
  border-radius: 8px;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;
const RenderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
