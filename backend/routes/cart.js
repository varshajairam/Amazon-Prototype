const express = require('express');
const kafka = require('../kafka');

const app = express();

app.post('/addToCart', (...args) => kafka.sendMessage('cart', { route: 'addToCart' }, args));
app.post('/removeProduct', (...args) => kafka.sendMessage('cart', { route: 'removeProduct' }, args));
app.post('/changeProductQuantity', (...args) => kafka.sendMessage('cart', { route: 'changeProductQuantity' }, args));
app.get('/getCartProducts', (...args) => kafka.sendMessage('cart', { route: 'getCartProducts' }, args));
app.post('/saveForLater', (...args) => kafka.sendMessage('cart', { route: 'saveForLater' }, args));
app.post('/applyGiftCharge', (...args) => kafka.sendMessage('cart', { route: 'applyGiftCharge' }, args));
app.post('/updateTotalCost', (...args) => kafka.sendMessage('cart', { route: 'updateTotalCost' }, args));

module.exports = app;
