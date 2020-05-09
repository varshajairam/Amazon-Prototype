const express = require('express');
const kafka = require('../kafka');

const app = express();

app.post('/get_profile', (...args) => kafka.sendMessage('profile', { route: 'get_profile' }, args));
app.post('/add_profile_image', (...args) => kafka.sendMessage('profile', { route: 'add_profile_image' }, args));
app.post('/edit_profile', (...args) => kafka.sendMessage('profile', { route: 'edit_profile' }, args));
app.post('/add_address', (...args) => kafka.sendMessage('profile', { route: 'add_address' }, args));
app.post('/delete_address', (...args) => kafka.sendMessage('profile', { route: 'delete_address' }, args));
app.post('/add_card', (...args) => kafka.sendMessage('profile', { route: 'add_card' }, args));
app.post('/delete_card', (...args) => kafka.sendMessage('profile', { route: 'delete_card' }, args));
app.get('/get_comments', (...args) => kafka.sendMessage('profile', { route: 'get_comments' }, args));

module.exports = app;
