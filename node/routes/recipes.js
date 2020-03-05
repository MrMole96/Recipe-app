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
        //var recipe = new Recipe(req.body);
        let recipeToSave = {
            name: req.body.name,
            difficulty: req.body.difficulty,
            numberOfPersons: req.body.numberOfPersons,
            description: req.body.description,
            listOfProducts: req.body.productsInRecipe
        };
        let recipe = new Recipe(recipeToSave);
        recipe.save().then(item => {
            Recipe.find({}, function (err, docs) {
                if (!err) {
                  res.send({ text: "Przepis zostal dodany", recipes: docs })
                } else { throw err; }
              });
        }).catch(err => {
            console.log(err)
            res.status(400).send("unable to save to database");
        })

        client.close();

    })
});

router.post("/byProducts", function (req, res, next) {
    console.log(req.body.products)
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
            res.send('item deleted');
        }).catch(err => {
            res.status(400).send("unable to delete from database");
        })
        client.close();

    })
});
module.exports = router;