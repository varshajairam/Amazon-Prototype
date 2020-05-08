const express = require('express');
const kafka = require('../kafka');

const app = express();

app.post('/addToCart', (...args) => kafka.sendMessage('operations', { route: 'addToCart' }, args));
app.post('/removeProduct', (...args) => kafka.sendMessage('operations', { route: 'removeProduct' }, args));
app.post('/changeProductQuantity', (...args) => kafka.sendMessage('operations', { route: 'changeProductQuantity' }, args));
app.get('/getCartProducts', (...args) => kafka.sendMessage('operations', { route: 'getCartProducts' }, args));
app.post('/saveForLater', (...args) => kafka.sendMessage('operations', { route: 'saveForLater' }, args));
app.post('/applyGiftCharge', (...args) => kafka.sendMessage('operations', { route: 'applyGiftCharge' }, args));
app.post('/updateTotalCost', (...args) => kafka.sendMessage('operations', { route: 'updateTotalCost' }, args));

module.exports = app;
