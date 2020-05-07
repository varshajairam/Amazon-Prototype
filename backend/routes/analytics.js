const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const { getTopFiveSoldProducts, getTopTenPerDay , dateTest} = require('../actions/analytics');

const app = express();

app.get('/getFive', getTopFiveSoldProducts);
app.get('/topTen', getTopTenPerDay);
app.get('/test', dateTest);
module.exports = app;
