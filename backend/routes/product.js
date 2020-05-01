const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const { addProduct, massEntryProducts, addMassProductsRedis, getProductsRedis } = require('../actions/product');
const kafka = require('../kafka');

const app = express();

app.post('/', addProduct);
app.post('/get_products', (...args) => kafka.sendMessage('product', { route: 'get_products' }, args));
app.post('/mass', massEntryProducts);
app.post('/addProductsRedis', addMassProductsRedis);
app.get('/getProductsRedis', getProductsRedis);

module.exports = app;
