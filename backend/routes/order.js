const express = require('express');
const passport = require('passport'); //WILL BE REQUIRED LATER
const { getOrders, placeOrder, updateOrder} = require('../actions/order');

const app = express();

app.get('/', getOrders);
app.post('/', placeOrder);
app.put('/', updateOrder);

module.exports = app;
