var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    calories: Number,
    unit: String,
    // listOfRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
});

var Product = mongoose.model('Product', ProductSchema, 'Products');

module.exports = Product