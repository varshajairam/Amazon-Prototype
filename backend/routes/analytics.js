const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const { getTopFiveSoldProducts, getTopTenPerDay , dateTest, getSellerProducts, getSellerMonthlySales} = require('../actions/analytics');

const app = express();

app.get('/getFive', getTopFiveSoldProducts);
app.get('/topTen', getTopTenPerDay);
app.get('/test', dateTest);
app.get('/sellerProducts', getSellerProducts);
app.get('/sellerMonthly', getSellerMonthlySales);
module.exports = app;
