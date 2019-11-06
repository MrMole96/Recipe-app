var express = require("express");
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/Recipes';
const dbName = 'Recipes';
const client = new MongoClient(url);
var mongoose = require('mongoose');
mongoose.connect(url,{useNewUrlParser: true});


var Product = require('../models/product');

router.get('/',function (req, res, next) {


      Product.find({},function (err,docs) {
        if(!err){
            console.log(docs);
            res.send(docs)
        }else {throw err;}
      });      

  
  });

  router.post('/',function (req,res,next) {

    //Array of products from which i want to make something
    console.log(req.body);
      // var data = req.body

      res.send('Ok')
    })


  module.exports = router;
