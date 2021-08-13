'use strict';


const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');



let todoData = [];

if (localStorage.getItem("todo") !== null) {
  todoData = JSON.parse(localStorage.getItem("todo"));
}

const render = function () {

  todoList.textContent = '';
  todoCompleted.textContent = '';
  headerInput.value = '';

  localStorage.setItem('todo', JSON.stringify(todoData));
  todoData.forEach(function (item, index) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const todoComplete = li.querySelector('.todo-complete');
    todoComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    });

    const todoRemove = li.querySelector('.todo-remove');
    todoRemove.addEventListener('click', function () {
      todoData.splice(index, 1);
      render();
    });
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();
  if (headerInput.value.trim() === '') {
    alert('Заполните поле!');
    headerInput.value = '';
  } else {
    const newTodo = {
      value: headerInput.value,
      completed: false
    };
    todoData.push(newTodo);

    render();
  }

});

render();