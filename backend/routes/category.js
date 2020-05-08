const express = require('express');
const kafka = require('../kafka');

const app = express();

app.post('/', (...args) => kafka.sendMessage('operations', { route: 'post/' }, args));
app.get('/', (...args) => kafka.sendMessage('operations', { route: 'get/' }, args));
app.delete('/', (...args) => kafka.sendMessage('operations', { route: 'delete/' }, args));

module.exports = app;
