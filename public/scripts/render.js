const appendChildTo = function(childInnerHtml, {parent, child}) {
  const parentElement = document.querySelector(parent);
  const template = document.createElement(child);
  template.innerHTML = childInnerHtml;
  parentElement.appendChild(template);
};

const itemsInHtml = function(task) {
  const {item, id, isDone} = task;
  const isChecked = isDone ? 'checked' : '';
  return `
   <div class="item" id="${id}">
       <input type="checkbox" name="isDone" editable="true" class="TickItem" ${isChecked} />
       <p class="task" contenteditable="true" onkeyDown="editTask()">${item}</p>
       <img src="../img/minus.png" class="close" onclick="deleteItem()" />
   </div><br/>`;
};

const todoDetailInHtml = function(resText, todoItems) {
  return `
  <p class="titleHeading">${resText[0].title}</p><br>
  <div id="showItemList">
    <div class="showItems">${todoItems.join('')}</div><br>
    <input name="item" class="input" id="addMoreTask" autocomplete="off" required type="text" onkeydown="addTask(event)" placeholder="tasks..." ></input >
    <img src="../img/plus.png" alt="add" class="icon" onclick="addTask(event)" id="__id__"/><br><br>
    <img src="../img/back.png" class="icon" onclick="removeDetail()">
    <img src="../img/tick.png" class="icon" onclick="updateIsDoneStatus()">
  </div>`;
};

const removeInputBox = function() {
  const form = document.querySelector('.list');
  form.removeChild(form.lastChild);
};

const addInputBox = function(event) {
  if (event.keyCode === 13 || event.target.alt === 'addTodo') {
    const input = `<input name="todoItem"  class="input" autocomplete="off" required type="text"
     onkeydown="addInputBox(event)" placeholder="tasks..." ></input ><br /><br />`;
    appendChildTo(input, {parent: '.list', child: 'li'});
  }
};

const showTodoItems = function(resText, args) {
  const detail = document.querySelector('.todoDetail');
  detail.id = args.todoId;
  detail.style.transform = 'scale(1)';
  const form = document.querySelector('.form');
  form.style.transform = 'scale(0)';
  const todoDetail = JSON.parse(resText)
    .filter(todo => todo.id === +args.todoId)
    .flat();
  const todoItems = todoDetail[0].todoItems.map(task => itemsInHtml(task));
  detail.innerHTML = todoDetailInHtml(todoDetail, todoItems);
};

const showAddForm = function() {
  const todoList = document.querySelector('.todoDetail');
  todoList.style.transform = 'scale(0)';
  const form = document.querySelector('.form');
  form.style.transform = 'scale(1)';
};

const getLeftItems = function(todoItems) {
  const leftItems = todoItems.filter(item => item.isDone);
  const formatedLeftItem = `${leftItems.length}/${todoItems.length}`;
  return formatedLeftItem;
};

const removeTitleBox = function() {
  const titles = document.querySelector('.todo');
  titles.removeChild(titles.lastChild);
};

const getHtmlForTitle = function(todo) {
  const {id, title, todoItems} = todo;
  const leftItems = getLeftItems(todoItems);
  return `<div class="showTitle"  id=${id} >
  <p class="title"  contenteditable="true" onkeyDown="editTitle()">${title}&nbsp</p>
  <p class="">${leftItems}&nbsp</p>
  <img src="../img/minus.png" class="close" onclick="deleteTodo()"/>
  <img src="../img/edit.png" class="close" onclick="showTasks()"/>
  </div>`;
};

const showTodoLists = function(resText) {
  removeTitleBox();
  const todoLists = JSON.parse(resText);
  const titlesInHtml = todoLists.map(getHtmlForTitle).join('');
  appendChildTo(titlesInHtml, {parent: '.todo', child: 'div'});
};

const removeDetail = function() {
  const detail = document.querySelector('.todoDetail');
  detail.style.transform = 'scale(0)';
};
