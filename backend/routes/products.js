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
    const newProduct = new Product({ image, category, title, price, description });
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (e) {
        console.error('Error', e);
        res.status(500).json({ message: e.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Deleted Successfully' });
    } catch(e) {
        console.error('Error', e);
        res.status(500).json({ message: 'Couldn\'t Delete Product'});
    }
});

module.exports = router;