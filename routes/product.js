const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const auth = require("../middleware/auth");

// GET all products
router.get('/',auth, async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.send(err);
    }
});

// GET product by ID
router.get('/:id',auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.send(err);
    }
});

// CREATE new product
router.post("/",auth, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price
    });

    try {
        const result = await product.save();
        res.json(result);
    } catch (err) {
        res.send(err);
    }
});

// UPDATE product
router.patch("/:id",auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (req.body.name) product.name = req.body.name;
        if (req.body.brand) product.brand = req.body.brand;
        if (req.body.price) product.price = req.body.price;

        const updated = await product.save();
        res.json(updated);
    } catch (err) {
        res.send(err);
    }
});

// DELETE product
router.delete("/:id",auth, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).send("Product not found");
        res.send("Product deleted successfully");
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;
