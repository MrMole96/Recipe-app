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

router.get('/', function (req, res, next) {
    client.connect(function (err) {
        Recipe
            .find({})
            .populate('listOfProducts')
            .exec(function (err, docs) {
                if (!err) {
                    res.send(docs)
                } else { throw err; }
            });

        client.close();
    })
});

router.post("/", function (req, res, next) {
    client.connect(function (err) {
        let recipeToSave = {
            name: req.body.name,
            difficulty: req.body.difficulty,
            numberOfPersons: req.body.numberOfPersons,
            description: req.body.description,
            listOfProducts: req.body.listOfProducts
        };
        let recipe = new Recipe(recipeToSave);
        recipe.save().then(item => {

            if (!err) {
                res.send({ text: 'Przepis zostal dodany' })
            } else { throw err; }

        }).catch(err => {
            res.status(400).send("unable to save to database");
        })

        client.close();

    })
});

router.post("/byProducts", function (req, res, next) {
    client.connect(function (err) {
        Recipe
            .find({
                listOfProducts: { $in: req.body.products }
            })
            .populate('listOfProducts')
            .exec(function (err, docs) {
                if (!err) {
                    res.send(docs)
                } else { throw err; }
            });

        client.close();
    })
});

router.delete("/", function (req, res, next) {
    client.connect(function (err) {
        Recipe.findById(req.query.id).remove().then(() => {
            if (!err) {
                res.send({ text: 'Przepis zostal usuniety' })
            } else { throw err; }
        }).catch(err => {
            res.status(400).send("unable to delete from database");
        })
        client.close();

    })
});
module.exports = router;