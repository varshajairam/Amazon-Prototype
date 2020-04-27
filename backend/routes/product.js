const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const {
    getProducts
} = require('../actions/product');

const app = express();

app.get('/getProducts', getProducts);

module.exports = app;