import { text } from "express";

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;
//document.getElementById() -> HTML 요소 가져오기
//as HTMLInputElement 타입 지정

type Todo = {
    id: number;
    text: string;
};

let todos: Todo[] = []; //할 일 목록 저장
let doneTask: Todo[] = []; // 완료된 목록 저장

const getTodoText = (): string => {
    return todoInput.value.trim(); // 공백 제거 후 입력한 텍스트 가져오기 
};

const addTodo = (text: string): void => {
    if (text === "") return; // 빈 문자열이면 return / 빈 입력 방지한다.

    todos.push({ id: Date.now(), text }); // Date.now() 현재 시간 기반으로 생성성
    todoInput.value = '';
    renderTasks(); // 화면 업데이트 
};

const completeTodo = (todo: Todo): void => {
    todos = todos.filter((t) => t.id !== todo.id); // filter()사용해서 todo에서서 해당 할 일 제거 
    doneTask.push(todo); // 완료 목록으로 이동시킴
    renderTasks(); // 화면 업데이트트
};

const deleteTodo = (todo: Todo): void => {
    doneTask = doneTask.filter((t) => t.id !== todo.id); // filter()사용해서 done에서 해당 할 일 제거 
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
    event.preventDefault(); // 새로고침 방지
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});

renderTasks(); //초기 화면을 렌더링하여 비어 있는 리스트를 표시

