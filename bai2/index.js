var express =require ('express');
var app =express();

var port =3000;

app.set("views engine","pug");
app.set ('views',"./views");

app.get ('/', function(request,response){
    response.send('<h1>Hello Coders.Tokyo</h1>')});


app.get ('/todos',function (request,response){
    response.render('index.pug');
});
app.get ('/users',function (req,res){
    res.render ("users/index.pug",{
        users:[
            { id:1 , name:"cuong"              },
            { id:2 , name:"truong cuong"              },
            { id:3 , name:"truong quoc cuong"              }
        ]
    });
});





app.listen (port,function(){
    console.log('Server listening on port' +port);


})
