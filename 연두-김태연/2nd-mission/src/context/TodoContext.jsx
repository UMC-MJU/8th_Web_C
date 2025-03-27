import { createContext, useState } from "react";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  return (
    <TodoContext.Provider value={{ todos, setTodos, doneTasks, setDoneTasks }}>
      {children}
    </TodoContext.Provider>
  );
}

// context API 사용해서 컴포넌트 분리