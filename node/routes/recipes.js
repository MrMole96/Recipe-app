var express = require("express");
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/Recipes';
const dbName = 'Recipes';
const client = new MongoClient(url);
var mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true });

var Recipe = require('../models/recipe');
var Product = require('../models/product');

function insertTestThings(db, params, callback) {
    const collection = db.collection('Recipes');
    var testProduct = new Product({
        name: 'maka',
        amount: 500,
        calories: 100,
        unit: 'kg'
    })

    testProduct.save();
    var test = new Recipe({
        name: 'Pizza',
        difficulty: 0,
        numberOfPersons: 2,
        description: 'Pizza Pizza',
        listOfProducts: [testProduct._id]
    })

    test.save().then(item => {
        res.send('item saved');
    }).catch(err => {
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