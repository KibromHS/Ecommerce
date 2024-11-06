const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image: String,
    category: String,
    title: String,
    rating: String,
    price: Number,
    description: String
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;