const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const { getProducts, addProduct, addReview } = require('../actions/product');

const app = express();

app.post('/', addProduct);
app.get('/', getProducts);
app.post('/addReview', addReview);

module.exports = app;
