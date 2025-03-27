import styled from "styled-components";
import { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext.jsx";

function TodoInput() {
  const { todos, setTodos } = useContext(TodoContext);
  const [todoText, setTodoText] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    if (todoText.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: todoText }]);
    setTodoText("");
  };

  return (
    <>
    <TodoContainerHeader>To-Do List</TodoContainerHeader>
     <TodoContainerForm onSubmit={addTodo}>
      <TodoContainerInput
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="할 일 입력"
      />
      <TodoContainerButton type="submit">할 일 추가</TodoContainerButton>
    </TodoContainerForm>
    </>
   
  );
}

export default TodoInput;


const TodoContainerHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
  color: #000;
  text-align: center;
`;

const TodoContainerForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const TodoContainerInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  background-color: #fff;

  color : #000;
  outline : none;
`;

const TodoContainerButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;
