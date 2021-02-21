// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

app.set('view engine','pug');
app.set('views','./views');

var port=3000;

var todos =[
    {id:1, name: 'Đi chợ'},
    {id:2, name: 'Nấu cơm'},
    {id:3, name: 'Rửa bát'},
    {id:4, name: 'Học code tại CodersX'}
];

// https://expressjs.com/en/starter/basic-routing.html
app.get ('/',function (request,response){
    response.render('index.pug');
});

app.get('/todos',function(request,response){
  // response.render('todos/index',{
  //   todos:todos
  // });
  
  var q = request.query.q;
  if(q){
  var matchedTodos = todos.filter(function (todo){
    return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  response.render('todos/index',{
    todos:matchedTodos
  });
  }
  else {
    response.render('todos/index',{
      todos:todos
    });
  }
});

// listen for requests :)
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
