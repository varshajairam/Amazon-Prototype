const express = require('express');

const app = express();

app.use('/auth', require('./auth'));
app.use('/category', require('./category'));
app.use('/product', require('./product'));
app.use('/analytics', require('./analytics'));

module.exports = app;
