const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const { getCategories, addCategory } = require('../actions/category');

const app = express();

app.post('/', addCategory);
app.get('/', getCategories);

module.exports = app;
