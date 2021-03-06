const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const {
  registerUser,
  redirectToIndexPage,
  validateUserExists,
  validateLogin,
  addTodo,
  addItem,
  deleteItem,
  deleteTodo,
  editTitle,
  editTask,
  serveDataBase,
  updateStatus,
  attachDetails,
  redirectToHomePage,
  logOut
} = require('./handlers');

const hasFields = (...fields) => {
  return (req, res, next) => {
    if (fields.every(field => field in req.body)) {
      return next();
    }
    res.statusCode = 400;
    res.end('bad Request');
  };
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attachDetails);
app.get('/logout', logOut);
app.get('/', redirectToHomePage);
app.post('/validateLogin', validateLogin);
app.get('/home.html', redirectToIndexPage);
app.get('/todoLists', serveDataBase);
app.use(express.static('public'));
app.post('/registerUser', registerUser);
app.post('/validateUserExists', validateUserExists);
app.post('/addTodo', addTodo);
app.post('/updateStatus', hasFields('todoId', 'taskId'), updateStatus);
app.post('/deleteItem', hasFields('todoId', 'itemId'), deleteItem);
app.post('/deleteTodo', hasFields('todoId'), deleteTodo);
app.post('/editTitle', hasFields('todoId', 'newTitle'), editTitle);
app.post('/editTask', hasFields('todoId', 'taskId', 'newTask'), editTask);
app.post('/addItem', hasFields('item', 'todoId'), addItem);

module.exports = { app };
