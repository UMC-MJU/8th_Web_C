import { createContext, PropsWithChildren, useContext, useState } from "react";
import { TTodo } from "../types/todo";

interface ITodoContext {
  todos: TTodo[];
  doneTodos: TTodo[];
  completeTodo: (todo: TTodo) => void;
  deleteTodo: (todo: TTodo) => void;
  addTodo: (text: string) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren): any => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  const addTodo = (text: string): any => {
    const newTodo: TTodo = { id: Date.now(), text };
    setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
  };

  const completeTodo = (todo: TTodo): void => {
    setTodos((prevTodos): TTodo[] =>
      prevTodos.filter((t): boolean => t.id !== todo.id)
    );
    setDoneTodos((prevDoneTodos): TTodo[] => [...prevDoneTodos, todo]);
  };

  const deleteTodo = (todo: TTodo): void => {
    setDoneTodos((prevDoneTodo): TTodo[] =>
      prevDoneTodo.filter((t): boolean => t.id !== todo.id)
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, doneTodos, completeTodo, deleteTodo, addTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): ITodoContext => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(
      "useTodo를 사용하기 위해선, 무조건 TodoProvider로 감싸야 합니다."
    );
  }

  return context;
};
