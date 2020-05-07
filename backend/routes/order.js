const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const { getOrders, placeOrder} = require('../actions/order');

const app = express();

app.get('/', getOrders);
app.post('/', placeOrder);

module.exports = app;
