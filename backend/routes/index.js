const express = require('express');

const app = express();

app.use('/auth', require('./auth'));
app.use('/product', require('./product'));

module.exports = app;
