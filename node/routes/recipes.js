var express = require("express");
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017/Recipes';
// Database Name
const dbName = 'Recipes';
// Create a new MongoClient
const client = new MongoClient(url);
var mongoose = require('mongoose');
mongoose.connect(url,{useNewUrlParser: true});

var Recipe = require('../models/recipe');
var Product = require('../models/product');

function insertTestThings(db, params, callback) {
    const collection = db.collection('Recipes');
    var testProduct = new Product({
        name: 'woda',
        amount: 100,
        calories: 50,
        unit: 'ml'
    })
    console.log(testProduct)
    testProduct.save();
    var test = new Recipe({
        name: 'Barszcz',
        difficulty: 1,
        numberOfPersons: 4,
        description: 'Cos tam cos tam',
        listOfProducts:[testProduct._id]
    })
    console.log(test);
    test.save().then(item=>{
        console.log('item',item)
        res.send('item saved');
    }).catch(err=>{
        res.status(400).send("unable to save to database");
    })

}
router.get("/", function (req, res, next) {
    console.log('get');
}),

router.post("/", function (req, res, next) {

    client.connect(function (err) {
        const db = client.db(dbName);
        insertTestThings(db, req, function () {
            client.close();
        })

    })
    res.send("API is working properly");
});

module.exports = router;