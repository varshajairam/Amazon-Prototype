const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const { moveToCart, removeSavedProduct, getProducts } = require('../actions/saveForLater');

const app = express();

app.post('/moveToCart', moveToCart);
app.post('/removeProduct', removeSavedProduct);
app.get('/getProducts', getProducts);

module.exports = app;
