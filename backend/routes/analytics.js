const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const { getTopFiveSoldProducts } = require('../actions/analytics');

const app = express();

app.get('/getFive', getTopFiveSoldProducts);
module.exports = app;
