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
    Recipe
        .find({})
        .populate('listOfProducts')
        .exec(function (err, docs) {
            if (!err) {
                res.send(docs)
            } else { throw err; }
        });
});

router.post("/", function (req, res, next) {
    client.connect(function (err) {
        //var recipe = new Recipe(req.body);
        console.log(req.body)
        console.log(req.body.description)
        let recipeToSave = {
            name: req.body.name,
            difficulty: req.body.difficulty,
            numberOfPersons: req.body.numberOfPersons,
            description: req.body.description,
            listOfProducts: req.body.productsInRecipe
        };
        let recipe = new Recipe(recipeToSave);
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