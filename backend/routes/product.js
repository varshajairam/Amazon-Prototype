const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const { getProducts, addProduct, massEntryProducts, addMassProductsRedis, getProductsRedis } = require('../actions/product');

const app = express();

app.post('/', addProduct);
app.get('/', getProducts);
app.post('/mass', massEntryProducts);
app.post('/addProductsRedis', addMassProductsRedis);
app.get('/getProductsRedis', getProductsRedis);

module.exports = app;
