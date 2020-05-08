const express = require('express');

const app = express();

app.use('/auth', require('./auth'));
app.use('/category', require('./category'));
app.use('/product', require('./product'));
app.use('/cart', require('./cart'));
app.use('/order', require('./order'));
app.use('/saveForLater', require('./saveForLater'));
app.use('/analytics', require('./analytics'));
app.use('/profile', require('./profile'));

module.exports = app;
