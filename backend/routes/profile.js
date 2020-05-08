const express = require('express');

const app = express();
const {
  getProfile, addProfileImage, editProfile, addAddress, deleteAddress, addCard, deleteCard,
  getComments,
} = require('../actions/profile');

app.post('/get_profile', getProfile);
app.post('/add_profile_image', addProfileImage);
app.post('/edit_profile', editProfile);
app.post('/add_address', addAddress);
app.post('/delete_address', deleteAddress);
app.post('/add_card', addCard);
app.post('/delete_card', deleteCard);
app.get('/get_comments', getComments);

module.exports = app;
