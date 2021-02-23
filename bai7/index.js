// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParse =require('body-parser');
var low =require('lowdb');
var shortid = require('shortid');
var FileSync =require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db =low(adapter);

var port =3000;

app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParse.json()); // for parsing application/json
app.use(bodyParse.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

db.defaults({todos:[]})
  .write();

// var todos =[
//     {id:1, todo: 'Đi chợ'},
//     {id:2, todo: 'Nấu cơm'},
//     {id:3, todo: 'Rửa bát'},
//     {id:4, todo: 'Học code tại CodersX'}
// ];

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
  var matchedTodos = db.get("todos").value().filter(function (todo){
    return todo.text.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  response.render('todos/index',{
    todos:matchedTodos
  });
  }
  else {
    response.render('todos/index',{
      todos:db.get('todos').value()
    });
  }
});




app.get('/todos/create',function(request,response){
    response.render('todos/create');
});
app.post('/todos/create',function(request,response){
  request.body.id =shortid.generate();
         db.get("todos").push(request.body).write();
        response.redirect('/todos');
         });

app.get('/todos/:id/delete',function(request,response){
  var id =request.params.id;
  console.log(id);

  var todo =db.get("todos").find({id:id}).value();
    db.get("todos").splice(db.get("todos").indexOf(todo),1).write();
  response.redirect('/todos');
});
// dung splice để xoá từ vị trí xxx 1 phần tử.




app.listen (port,function(){
    console.log('Server listening on port' +port);


});
