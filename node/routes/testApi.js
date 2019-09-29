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

function insertTestThings(db, params, callback) {
    const collection = db.collection('Recipes');
    console.log('params',params.body)
    collection.insert({
        nazwa: params.body.name,
        test: params.body.test
    }, function (err, result) {
        callback(result);
    });

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