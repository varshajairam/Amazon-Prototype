const express = require('express');
// const passport = require('passport'); //WILL BE REQUIRED LATER
const { getAnalytics, getOrdersPerDay, getTopSoldProducts, getTopSeller, getTopCustomer, getTopProducts, getTopProductsViewed } = require('../actions/analytics');

const app = express();

app.get('/getAnalytics', getAnalytics);
app.get('/getOrdersPerDay', getOrdersPerDay);
app.get('/getTopSoldProducts', getTopSoldProducts);
app.get('/getTopSeller', getTopSeller);
app.get('/getTopCustomer', getTopCustomer);
app.get('/getTopProducts', getTopProducts);
app.get('/getTopProductsViewed', getTopProductsViewed);

module.exports = app;
