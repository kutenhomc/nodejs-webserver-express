"use strict";

var port = 3000;

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json

app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
//db

var low = require('lowdb');

var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter); //user

var adapter1 = new FileSync('users.json');
var db1 = low(adapter1); //

app.set('view engine', 'pug');
app.set('views', './views'); //show root

app.get('/books', function (req, res) {
  var data = db.get('data').value();
  res.render('books', {
    books: data
  });
}); //shot add

app.get('/books/add', function (req, res) {
  res.render('add');
}); //add

app.post('/books/add', function (req, res) {
  var nameAdd = req.body.nameAdd;
  var descriptionAdded = req.body.descriptionAdded;
  var data = db.get('data').value();
  db.get('data').push({
    id: data.length + 1,
    title: nameAdd,
    description: descriptionAdded
  }).write();
  res.redirect('/books');
}); //delete

app.get('/books/delete/:id', function (req, res) {
  var id = parseInt(req.params.id);
  db.get('data').remove({
    id: id
  }).write();
  res.redirect('/books');
}); //view

app.get('/books/detail/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var dataFinded = db.get('data').find({
    id: id
  }).value();
  var dataArr = [];
  dataArr.push(dataFinded);
  res.render('detail', {
    dataDetail: dataArr
  });
}); //update

app.get('/books/update/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var dataFinded = db.get('data').find({
    id: id
  }).value();
  var dataArr = [];
  dataArr.push(dataFinded);
  res.render('update', {
    dataDetail: dataArr
  });
});
app.post('/books/update/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var titleUpdate = req.body.titleUpdate;
  var descriptionUpdate = req.body.descriptionUpdate;
  db.get('data').find({
    id: id
  }).assign({
    title: titleUpdate,
    description: descriptionUpdate
  }).write();
  res.redirect('/books');
}); //user
//show root

app.get('/users', function (req, res) {
  var users = db1.get('users').value();
  res.render('users/users.pug', {
    users: users
  });
}); //shot add

app.get('/users/add', function (req, res) {
  res.render('users/add');
}); //add

app.post('/users/add', function (req, res) {
  var nameAdd = req.body.nameAdd;
  var ageAdd = req.body.ageAdd;
  var users = db1.get('users').value();
  db1.get('users').push({
    id: users.length + 1,
    name: nameAdd,
    age: ageAdd
  }).write();
  res.redirect('/users');
}); //delete

app.get('/users/delete/:id', function (req, res) {
  var id = parseInt(req.params.id);
  db1.get('users').remove({
    id: id
  }).write();
  res.redirect('/users');
}); //view

app.get('/users/detail/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var dataFinded = db1.get('users').find({
    id: id
  }).value();
  var dataArr = [];
  dataArr.push(dataFinded);
  res.render('users/detail', {
    dataDetail: dataArr
  });
}); //update

app.get('/users/update/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var dataFinded = db1.get('users').find({
    id: id
  }).value();
  var dataArr = [];
  dataArr.push(dataFinded);
  res.render('users/update', {
    dataDetail: dataArr
  });
});
app.post('/users/update/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var nameAdd = req.body.nameAdd;
  var ageAdd = req.body.ageAdd;
  db1.get('users').find({
    id: id
  }).assign({
    name: nameAdd,
    age: ageAdd
  }).write();
  res.redirect('/users');
});
app.listen(port, function () {
  console.log('Server listening on port' + port);
});