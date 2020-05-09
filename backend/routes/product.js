const express = require('express');
const kafka = require('../kafka');

const app = express();

app.get('/', (...args) => kafka.sendMessage('product', { route: 'getProducts' }, args));
app.post('/', (...args) => kafka.sendMessage('product', { route: 'addProduct' }, args));
app.put('/', (...args) => kafka.sendMessage('product', { route: 'updateProduct' }, args));
app.post('/addView', (...args) => kafka.sendMessage('product', { route: 'addView' }, args));
app.delete('/', (...args) => kafka.sendMessage('product', { route: 'deleteProduct' }, args));
app.get('/recomendations', (...args) => kafka.sendMessage('product', { route: 'recomendations' }, args));
app.post('/addReview', (...args) => kafka.sendMessage('product', { route: 'addReview' }, args));
app.get('/single', (...args) => kafka.sendMessage('product', { route: 'single' }, args));

module.exports = app;
