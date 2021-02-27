var port =3000;
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//db
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
//user
const adapter1 = new FileSync('users.json');
const db1 = low(adapter1);

//
app.set('view engine', 'pug')
app.set('views', './views')

//show root
app.get('/books', (req, res) => {
  const data = db.get('data').value();
	res.render('books', { books: data});
})

//shot add
app.get('/books/add', (req, res) => {
	res.render('add');
});

//add
app.post('/books/add', (req, res) => {
	const nameAdd = req.body.nameAdd;
	const descriptionAdded = req.body.descriptionAdded;
  const data = db.get('data').value();
  
	db.get('data').push({ id: data.length + 1 , title: nameAdd, description: descriptionAdded }).write();
	res.redirect('/books');

});

//delete
app.get('/books/delete/:id', (req, res) => {
	const id = parseInt(req.params.id);
  
	db.get('data').remove({ id }).write();
	res.redirect('/books');
});

//view
app.get('/books/detail/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const dataFinded = db.get('data').find({id: id}).value();
	const dataArr = [];
  
	dataArr.push(dataFinded);
	res.render('detail', { dataDetail: dataArr });
});

//update
app.get('/books/update/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const dataFinded = db.get('data').find({id: id}).value();
	const dataArr = [];
  
	dataArr.push(dataFinded);
	res.render('update', {dataDetail: dataArr});
});

app.post('/books/update/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const titleUpdate = req.body.titleUpdate;
	const descriptionUpdate = req.body.descriptionUpdate;
  
	db.get('data')
	  .find({ id: id})
	  .assign({ title: titleUpdate, description: descriptionUpdate})
	  .write();

	res.redirect('/books')
});

//user
//show root
app.get('/users', (req, res) => {
	const users = db1.get('users').value();
	res.render('users/users.pug', { users: users});
});

  //shot add
app.get('/users/add', (req, res) => {
	res.render('users/add');
  });
  
  //add
  app.post('/users/add', (req, res) => {
	  const nameAdd = req.body.nameAdd;
	  const ageAdd = req.body.ageAdd;
	  const users = db1.get('users').value();
	
	  db1.get('users').push({ id: users.length + 1 , name: nameAdd, age: ageAdd }).write();
	  res.redirect('/users');
  
  });
  
  //delete
  app.get('/users/delete/:id', (req, res) => {
	  const id = parseInt(req.params.id);
	
	  db1.get('users').remove({ id }).write();
	  res.redirect('/users');
  });
  
  //view
  app.get('/users/detail/:id', (req, res) => {
	  const id = parseInt(req.params.id);
	  const dataFinded = db1.get('users').find({id: id}).value();
	  const dataArr = [];
	
	  dataArr.push(dataFinded);
	  res.render('users/detail', { dataDetail: dataArr });
  });
  
  //update
  app.get('/users/update/:id', (req, res) => {
	  const id = parseInt(req.params.id);
	  const dataFinded = db1.get('users').find({id: id}).value();
	  const dataArr = [];
	
	  dataArr.push(dataFinded);
	  res.render('users/update', {dataDetail: dataArr});
  });
  
  app.post('/users/update/:id', (req, res) => {
	  const id = parseInt(req.params.id);
	  const nameAdd = req.body.nameAdd;
	  const ageAdd = req.body.ageAdd;
	
	  db1.get('users')
		.find({ id: id})
		.assign({ name: nameAdd, age: ageAdd})
		.write();
  
		res.redirect('/users');
  });
app.listen (port,function(){
    console.log('Server listening on port' +port);


});
