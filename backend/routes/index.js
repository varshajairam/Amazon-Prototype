const express = require('express');

const app = express();

app.use('/auth', require('./auth'));
app.use('/category', require('./category'));
app.use('/product', require('./product'));
app.use('/cart', require('./cart'));
app.use('/saveForLater', require('./saveForLater'));

module.exports = app;
