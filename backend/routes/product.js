const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const { getProducts, addProduct, addReview, deleteProduct, updateProduct } = require('../actions/product');

const app = express();

app.get('/', getProducts);
app.post('/', addProduct);
app.put('/', updateProduct);
app.delete('/', deleteProduct);
app.post('/addReview', addReview);

module.exports = app;
