const express = require('express');

const app = express();
const {
  getSellers
} = require('../actions/users');

app.get('/getSellers', getSellers);

module.exports = app;