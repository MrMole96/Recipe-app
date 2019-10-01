var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017/Recipes';
// Database Name
const dbName = 'Recipes';
// Create a new MongoClient
const client = new MongoClient(url);


var recipesRouter = require('./routes/recipes');


var app = express();

process.env.PORT = 4000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/recipesRouter', recipesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


app.listen(9000, 'localhost');
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// Use connect method to connect to the Server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  insertDocuments(db, function () {
    client.close();
  })

  client.close();
});

const insertDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('Recipes');
  // Insert some documents
  //   collection.insertMany([
  //     {a : 1}, {a : 2}, {a : 3}
  //   ], function(err, result) {
  //  console.log(result);
  //     console.log("Inserted 3 documents into the collection");
  //     callback(result);
  //   });
}

module.exports = app;
