var express = require("express");
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/Recipes';
const dbName = 'Recipes';
const client = new MongoClient(url);
var mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true });


var Product = require('../models/product');

router.get('/', function (req, res, next) {
  Product.find({}, function (err, docs) {
    if (!err) {
      // console.log(docs);
      res.send(docs)
    } else { throw err; }
  });


});

router.post("/", function (req, res, next) {
  client.connect(function (err) {
    var product = new Product(req.body);
    product.save().then(item => {
      res.send('Produkt zostal zapisany');
    }).catch(err => {
      res.status(400).send("unable to save to database");
    })

    client.close();

  })
  // res.send("API is working properly");
});
router.delete("/", function (req, res, next) {
  client.connect(function (err) {
    console.log('delete',req.query)
    Product.findById(req.query.id).remove().then(() => {
      res.send('Produkt zostal usuniety');
    }).catch(err => {
      res.status(400).send("unable to delete from database");
    })
    client.close();

  })
  // res.send("API is working properly");
});

module.exports = router;
