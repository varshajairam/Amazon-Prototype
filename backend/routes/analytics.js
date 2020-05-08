const express = require('express');
const {
  getTopFiveSoldProducts, getTopTenProductsViewed, getNoOfOrders,
  getTopTenProductsBasedOnRatings, getTopTenCustomersBasedOnPurchaseAmount,
} = require('../actions/analytics');

const app = express();

app.get('/getTopFiveSoldProducts', getTopFiveSoldProducts);
app.get('/getTopTenProductsViewed', getTopTenProductsViewed);
app.get('/getNoOfOrders', getNoOfOrders);
app.get('/getTopTenProductsBasedOnRatings', getTopTenProductsBasedOnRatings);
app.get('/getTopTenCustomersBasedOnPurchaseAmount', getTopTenCustomersBasedOnPurchaseAmount);
module.exports = app;
