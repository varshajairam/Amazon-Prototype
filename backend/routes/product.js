const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const { getProducts, addProduct, massEntryProducts } = require('../actions/product');

const app = express();

app.post('/', addProduct);
app.get('/', getProducts);
app.post('/mass', massEntryProducts);

module.exports = app;
