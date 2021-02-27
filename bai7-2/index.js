var port =3000;
// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync("db.json");
var shortid =require("shortid");

var db = low(adapter);
db.defaults({ books: [] }).write();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// our default array of dreams

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.render("index.pug");
});

// send the default array of dreams to the webpage
app.get("/books", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.render("books/index", {
    books: db.get('books').value()
  });
});

app.get("/books/search", function(request, response) {
  var q = request.query.b;
  if (q) {
    var matchedBooks = db.get('books').value().filter(function(book) {
      return book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    response.render("books/index", {
      books: matchedBooks
    });
  } else {
    response.render("books/index", {
     books: db.get('books').value()
    });
  }
});
//đã xong phần search name of book

//add books
app.get("/books/create", function(request, response) {
  response.render("books/create");
});

app.post("/books/create", function(request, response) {
  request.body.id =shortid.generate();
  db.get('books').push(request.body).write();
  response.redirect("/books");
});


// delete books
app.get('/books/:id/delete',function(request,response){
    var id =request.params.id;
  console.log(id);

  var book =db.get("books").splice(db.get("books").indexOf(book),1).write();
  response.redirect("/books");
});


// run application
app.listen (port,function(){
    console.log('Server listening on port' +port);


});
