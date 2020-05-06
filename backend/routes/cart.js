const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const { getCartProducts, addProductToCart, saveForLater, removeProduct, changeProductQuantity } = require('../actions/cart');

const app = express();

app.post('/addToCart', addProductToCart);
app.post('/removeProduct', removeProduct);
app.post('/changeProductQuantity', changeProductQuantity);
app.get('/getCartProducts', getCartProducts);
app.post('/saveForLater', saveForLater);

module.exports = app;
