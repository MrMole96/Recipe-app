var express = require("express");
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/Recipes';
const dbName = 'Recipes';
const client = new MongoClient(url);
var mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true });

var Recipe = require('../models/recipe');

router.get('/', function (req, res, next) {
    Recipe.find({}, function (err, docs) {
        if (!err) {
            // console.log(docs);
            res.send(docs)
        } else { throw err; }
    });
});

router.post("/", function (req, res, next) {
    client.connect(function (err) {
        var recipe = new Recipe(req.body);
        recipe.save().then(item => {
            res.send('item saved');
        }).catch(err => {
            res.status(400).send("unable to save to database");
        })

        client.close();

    })
});
router.delete("/", function (req, res, next) {
    client.connect(function (err) {
        Recipe.findById(req.query.id).remove().then(() => {
            res.send('item saved');
        }).catch(err => {
            res.status(400).send("unable to delete from database");
        })
        client.close();

    })
});
module.exports = router;