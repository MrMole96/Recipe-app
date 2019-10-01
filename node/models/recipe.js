var mongoose = require("mongoose");

var RecipeSchema = new mongoose.Schema({
    name: String,
    difficulty: Number,
    numberOfPersons: Number,
    image: { data: Buffer, contentType: String },
    description: String,
    averageTime: Date,
    listOfProducts: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }]
});

var Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = {
    Recipe: Recipe
}