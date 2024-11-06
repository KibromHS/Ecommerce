const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (e) {
        console.error('Error', e);
        res.status(500).json({message: e.message});
    }
});

router.post('/', async (req, res) => {
    const { image, category, title, price, description } = req.body;
    const newProduct = new Product({ image, category, title, rating, price, description });
    try {
        newProduct = await newProduct.save();
        res.status(201).json(newProduct);
    } catch (e) {
        console.error('Error', e);
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;