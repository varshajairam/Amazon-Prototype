const express = require('express');
const kafka = require('../kafka');

const app = express();

app.get('/', (...args) => kafka.sendMessage('operations', { route: 'getProducts' }, args));
app.post('/', (...args) => kafka.sendMessage('operations', { route: 'addProduct' }, args));
app.put('/', (...args) => kafka.sendMessage('operations', { route: 'updateProduct' }, args));
app.post('/addView', (...args) => kafka.sendMessage('operations', { route: 'addView' }, args));
app.delete('/', (...args) => kafka.sendMessage('operations', { route: 'deleteProduct' }, args));
app.get('/recomendations', (...args) => kafka.sendMessage('operations', { route: 'recomendations' }, args));
app.post('/addReview', (...args) => kafka.sendMessage('operations', { route: 'addReview' }, args));
app.get('/single', getProduct);

module.exports = app;
