"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var todoInput = document.getElementById('todo-input');
var todoForm = document.getElementById('todo-form');
var todoList = document.getElementById('todo-list');
var doneList = document.getElementById('done-list');
var todos = [];
var doneTask = [];
var getTodoText = function () {
    return todoInput.value.trim();
};
var addTodo = function (text) {
    if (text === "")
        return;
    todos.push({ id: Date.now(), text: text });
    todoInput.value = '';
    renderTasks();
};
var completeTodo = function (todo) {
    todos = todos.filter(function (t) { return t.id !== todo.id; });
    doneTask.push(todo);
    renderTasks();
};
var deleteTodo = function (todo) {
    doneTask = doneTask.filter(function (t) { return t.id !== todo.id; });
    renderTasks();
};
var createTodoElement = function (todo, isDone) {
    var li = document.createElement('li');
    li.classList.add('render-container_item');
    li.textContent = todo.text;
    var button = document.createElement('button');
    button.classList.add('render-container_item-button');
    if (isDone) {
        button.textContent = "삭제";
        button.style.backgroundColor = '#dc3545';
        button.addEventListener('click', function () { return deleteTodo(todo); });
    }
    else {
        button.textContent = "완료";
        button.style.backgroundColor = '#28a745';
        button.addEventListener('click', function () { return completeTodo(todo); });
    }
    li.appendChild(button);
    return li;
};
var renderTasks = function () {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach(function (todo) {
        var li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTask.forEach(function (todo) {
        var li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
renderTasks();
