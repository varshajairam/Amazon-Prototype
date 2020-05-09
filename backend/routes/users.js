const express = require('express');
const kafka = require('../kafka');

const app = express();

app.get('/getSellers', (...args) => kafka.sendMessage('operations', { route: 'getSellers' }, args));

module.exports = app;
