import { text } from "express";

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

type Todo = {
    id: number;
    text: string;
};

let todos: Todo[] = [];
let doneTask: Todo[] = [];

const getTodoText = (): string => {
    return todoInput.value.trim();
};

const addTodo = (text: string): void => {
    if (text === "") return;

    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTasks();
};

const completeTodo = (todo: Todo): void => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTask.push(todo);
    renderTasks();
};

const deleteTodo = (todo: Todo): void => {
    doneTask = doneTask.filter((t) => t.id !== todo.id);
    renderTasks();
};

const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
    const li = document.createElement('li');
    li.classList.add('render-container_item');
    li.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container_item-button');

    if (isDone) {
        button.textContent = "삭제";
        button.style.backgroundColor = '#dc3545';
        button.addEventListener('click', () => deleteTodo(todo));
    } else {
        button.textContent = "완료";
        button.style.backgroundColor = '#28a745';
        button.addEventListener('click', () => completeTodo(todo));
    }

    li.appendChild(button);
    return li;
};

const renderTasks = (): void => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });

    doneTask.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};

todoForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});

renderTasks();
