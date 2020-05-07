const express = require('express');
const { getTopFiveSoldProducts, getTopTenPerDay , dateTest} = require('../actions/analytics');

const app = express();

app.get('/getTopFiveSoldProducts', getTopFiveSoldProducts);
app.get('/topTen', getTopTenPerDay);
app.get('/test', dateTest);
module.exports = app;
