const express = require('express');
const kafka = require('../kafka');

const app = express();

app.get('/getTopFiveSoldProducts', (...args) => kafka.sendMessage('analytics', { route: 'getTopFiveSoldProducts' }, args));
app.get('/getTopTenProductsViewed', (...args) => kafka.sendMessage('analytics', { route: 'getTopTenProductsViewed' }, args));
app.get('/getNoOfOrders', (...args) => kafka.sendMessage('analytics', { route: 'getNoOfOrders' }, args));
app.get('/getTopTenProductsBasedOnRatings', (...args) => kafka.sendMessage('analytics', { route: 'getTopTenProductsBasedOnRatings' }, args));
app.get('/getTopTenCustomersBasedOnPurchaseAmount', (...args) => kafka.sendMessage('analytics', { route: 'getTopTenCustomersBasedOnPurchaseAmount' }, args));
app.get('/sellerProducts', (...args) => kafka.sendMessage('analytics', { route: 'sellerProducts' }, args));
app.get('/sellerMonthly', (...args) => kafka.sendMessage('analytics', { route: 'sellerMonthly' }, args));

module.exports = app;
