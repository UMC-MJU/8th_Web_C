import { createContext, PropsWithChildren, ReactElement, useContext, useState } from "react";
import { TTodo } from "../types/todo";

interface ITodoContext {
    todos: TTodo[];
    doneTodos: TTodo[];
    addTodo: (text: string) => void;
    completeTodo: (todo: TTodo) => void;
    deleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: PropsWithChildren): ReactElement => {
    const [todos, setTodos] = useState<TTodo[]>([
    ]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([
    ]);
    const addTodo = (text: string): void => {
        const newTodo: TTodo = {
            id: Date.now(),
            text,
        };
        setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
    }
    const completeTodo = (todo: TTodo): void => {
        setTodos((prevTodos): TTodo[] => prevTodos.filter((t): boolean => t.id != todo.id));
        setDoneTodos((prevDoneTodos): TTodo[] => [...prevDoneTodos, todo]);
    };

    const deleteTodo = (doneTodo: TTodo): void => {
        setDoneTodos((prevDoneTodos): TTodo[] => prevDoneTodos.filter((t): boolean => t.id != doneTodo.id));
    };
    return (
        <TodoContext.Provider
            value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}
        >
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = (): ITodoContext => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야합니다.')
    }
    return context;
}