const express = require('express');
const { getCategories, addCategory, deleteCategory } = require('../actions/category');

const app = express();

app.post('/', addCategory);
app.get('/', getCategories);
app.delete('/', deleteCategory);

module.exports = app;
