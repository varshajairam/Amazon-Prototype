const express = require('express');

const app = express();

app.use('/auth', require('./auth'));
app.use('/category', require('./category'));
app.use('/product', require('./product'));
app.use('/order', require('./order'));

module.exports = app;
