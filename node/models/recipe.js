var mongoose = require("mongoose");

var RecipeSchema = new mongoose.Schema({
    name: String,
    difficulty: String,
    numberOfPersons: Number,
    image: { data: Buffer, contentType: String },
    description: [{
        type:String
    }],
    averageTime: Date,
    listOfProducts: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }]
});

var Recipe = mongoose.model('Recipe', RecipeSchema, 'Recipes');

module.exports =  Recipe;