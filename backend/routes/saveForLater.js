const express = require('express');
const kafka = require('../kafka');

const app = express();

app.post('/moveToCart', (...args) => kafka.sendMessage('operations', { route: 'moveToCart' }, args));
app.post('/removeProduct', (...args) => kafka.sendMessage('operations', { route: 'removeProductSave' }, args));
app.get('/getProducts', (...args) => kafka.sendMessage('operations', { route: 'getProductsSave' }, args));

module.exports = app;
