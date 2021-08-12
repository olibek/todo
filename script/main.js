'use strict';


const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

let todoData = JSON.parse(localStorage.getItem("todo"));

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  headerInput.value = '';

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
let locIn = function () {
  localStorage.setItem('todo', JSON.stringify(todoData));

};
todoControl.addEventListener('submit', function (event) {
  event.preventDefault();
  if (headerInput.value === '') {
    alert('Заполните поле!');
  } else {
    const newTodo = {
      value: headerInput.value,
      completed: false
    };
    todoData.push(newTodo);
    locIn();
    render();
  }

});



// todoData = localStorage.getItem('todo', JSON.stringify(todoData));
render();