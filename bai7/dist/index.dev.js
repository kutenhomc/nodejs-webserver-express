"use strict";

// server.js
// where your node app starts
// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");

var app = express();

var bodyParse = require('body-parser');

var port = 3000;
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParse.json()); // for parsing application/json

app.use(bodyParse.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

var todos = [{
  id: 1,
  todo: 'Đi chợ'
}, {
  id: 2,
  todo: 'Nấu cơm'
}, {
  id: 3,
  todo: 'Rửa bát'
}, {
  id: 4,
  todo: 'Học code tại CodersX'
}]; // https://expressjs.com/en/starter/basic-routing.html

app.get('/', function (request, response) {
  response.render('index.pug');
});
app.get('/todos', function (request, response) {
  // response.render('todos/index',{
  //   todos:todos
  // });
  var q = request.query.q;

  if (q) {
    var matchedTodos = todos.filter(function (todo) {
      return todo.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    response.render('todos/index', {
      todos: matchedTodos
    });
  } else {
    response.render('todos/index', {
      todos: todos
    });
  }
});
app.get('/todos/create', function (request, response) {
  response.render('todos/create');
});
app.post('/todos/create', function (request, response) {
  todos.push(request.body);
  response.redirect('/todos');
});
app.listen(port, function () {
  console.log('Server listening on port' + port);
});