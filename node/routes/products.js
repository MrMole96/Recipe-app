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
      Product.find({}, function (err, docs) {
        if (!err) {
          res.send({ text: "Produkt zostal dodany", products: docs })
        } else { throw err; }
      });
    }).catch(err => {
      res.status(400).send("unable to save to database");
    })

    client.close();

  })
  // res.send("API is working properly");
});
router.delete("/", function (req, res, next) {
  client.connect(function (err) {
    Product.findById(req.query.id).remove().then(() => {
      Product.find({}, function (err, docs) {
        if (!err) {
          res.send({ text: "Produkt zostal usuniety", products: docs })
        } else { throw err; }
      });
    }).catch(err => {
      res.status(400).send("unable to delete from database");
    })
    client.close();

  })
  // res.send("API is working properly");
});

module.exports = router;
