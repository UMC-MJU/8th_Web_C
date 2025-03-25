import { useState } from 'react';
import './App.css';
import styled from "styled-components";

function App() {
  const [todoText, setTodoText] = useState(''); 
  const [todos, setTodos] = useState([]); 
  const [doneTasks, setDoneTasks] = useState([]);


  const addTodo = (event) => {
    event.preventDefault();
    if (todoText.trim() === '') return;

    setTodos([...todos, { id: Date.now(), text: todoText }]);
    setTodoText('');
  };

  const completeTask = (id) => {
    const taskToComplete = todos.find((task) => task.id === id);
    setTodos(todos.filter((task) => task.id !== id));
    setDoneTasks([...doneTasks, taskToComplete]);
  };

  const deleteTask = (id) => {
    setDoneTasks(doneTasks.filter((task) => task.id !== id));
  };

  return (
    <TodoContainer>
      <TodoContainerHeader>TO-DO List</TodoContainerHeader>
      <TodoContainerForm onSubmit={addTodo}>
        <TodoContainerInput
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="할 일 입력"
          required
        />
        <TodoContainerButton type="submit">할 일 추가</TodoContainerButton>
      </TodoContainerForm>
      <RenderContainer>
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
        <RenderContainerSection>
          <RenderContainerTitle>완료</RenderContainerTitle>
          <RenderContainerList>
            {doneTasks.map((task) => (
              <RenderContainerItem key={task.id}>
                <RenderContainerItemText>{task.text}</RenderContainerItemText>
                <RenderContainerItemButtondel onClick={() => deleteTask(task.id)} deleteBtn>
                  삭제
                </RenderContainerItemButtondel>
              </RenderContainerItem>
            ))}
          </RenderContainerList>
        </RenderContainerSection>
      </RenderContainer>
    </TodoContainer>
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

// 렌더 컨테이너
const RenderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

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
const RenderContainerItemButtondel = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 12px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;
