var express =require ('express');
var app =express();

var port =3000;

app.set('view engine','pug');
app.set('views','./views');

var todos =[
    {id:1, name: 'Đi chợ'},
    {id:2, name: 'Nấu cơm'},
    {id:3, name: 'Rửa bát'},
    {id:4, name: 'Học code tại CodersX'}
];

app.get ('/', function(request,response){
    response.render('index.pug')});


app.get ('/todos',function (request,response){
    console.log(request.query);
    var q =request.query.q;

    var matchedTodos =todos.filter(function (todo){
        return todo.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
    response.render('todos/index.pug',{
        todos:matchedTodos,
        queryInput:q
    });
});
app.listen (port,function(){
    console.log('Server listening on port' +port);


});
