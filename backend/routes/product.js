const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const { getProducts, addProduct, addReview, deleteProduct, updateProduct, getRecomendations, addView , getProduct} = require('../actions/product');

const app = express();

app.get('/', getProducts);
app.post('/', addProduct);
app.put('/', updateProduct);
app.post('/addView', addView);
app.delete('/', deleteProduct);
app.get('/recomendations', getRecomendations);
app.post('/addReview', addReview);
app.get('/single', getProduct);

module.exports = app;
