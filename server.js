//Start by requiring dependencies

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

//port for listening
const port = 8000;

//So Express can process URL encoded forms on its own
app.use(bodyParser.urlencoded({ extended: true })); 

//Use MongoClient to connect to Db
MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log (err);

var db = database.db('notekeeper');
  //import route for use 
require('./app/routes')(app, db);

app.listen(port, ()=> {
    console.log('Live on ' + port)
 });

});

