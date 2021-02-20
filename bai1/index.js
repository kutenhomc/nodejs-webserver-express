var express =require ('express');
var app =express();

var port =3000;

app.get ('/', function(request,response){
    response.send('<h1>Hello Coders.Tokyo</h1>')});


app.get ('/todos',function (request,response){
    response.send('<ul><li>Đi chợ</li><li>Nấu cơm</li><li>Rửa bát</li><li>Học code tại CodersX</li></ul>')
});






app.listen (port,function(){
    console.log('Server listening on port' +port);


})
