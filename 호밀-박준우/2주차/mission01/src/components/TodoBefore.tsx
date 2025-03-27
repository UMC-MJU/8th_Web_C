import React, { FormEvent } from "react";
import { useState } from "react";
import { TTodo } from "../types/todo";

const TodoBefore = () => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
    const [input, setInput] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const text = input.trim();

        if (text) {
            const newTodo: TTodo = { id: Date.now(), text };
            setTodos((prevTodo): TTodo[] => [...prevTodo, newTodo]);
            setInput('');
        }
    };

    const completeTodo = (todo: TTodo): void => {
        setTodos(prevTodos => prevTodos.filter((t): boolean => t.id !== todo.id));
        setDoneTodos((prevDoneTodos): TTodo[] => [...prevDoneTodos, todo]);
    }

    const deleteTodo = (todo: TTodo): void => {
        setDoneTodos((prevDoneTodo): TTodo[] => prevDoneTodo.filter((t): boolean => t.id !== todo.id));
    }

    return <div className="todo-container">
        <h1 className="todo-container__header">todo</h1>
        <form
            onChange={handleSubmit}
            className="todo-container__form">
            <input
                value={input}
                onChange={(e): void => setInput(e.target.value)}
                type="text" className="todo-container__input"
                placeholder="할 일 입력"
                required />
            <button
                type="submit" className="todo-container__button">
                할 일 추가
            </button>
        </form>
        <div className="render-container">
            <div className="render-container__section">
                <h2 className="render-container__title">할일</h2>
                <ul id="todo-list" className="render-container__list">
                    {todos.map((todo) => (
                        <li className="render-container__item">
                            <span className="render-container__item-text">{todo.text}</span>
                            <button
                                onClick={(): void => completeTodo(todo)}
                                style={{
                                    backgroundColor: '#28a745',
                                }}
                                className="render-container__item-button"
                            >완료
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="render-container__section">
                <h2 className="render-container__title">완료</h2>
                <ul id="todo-list" className="render-container__list">
                    {doneTodos.map((todo) => (
                        <li className="render-container__item">
                            <span className="render-container__item-text">{todo.text}</span>
                            <button
                                onClick={(): void => deleteTodo(todo)}
                                style={{
                                    backgroundColor: '#dc3545',
                                }}
                                className="render-container__item-button"
                            >삭제
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>;
}

export default TodoBefore;
