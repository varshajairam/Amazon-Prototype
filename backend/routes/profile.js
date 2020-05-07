const express = require('express');

const app = express();
const {
  getProfile, addProfileImage, editProfile, addAddress,
} = require('../actions/profile');

app.post('/get_profile', getProfile);
app.post('/add_profile_image', addProfileImage);
app.post('/edit_profile', editProfile);
app.post('/add_address', addAddress);

module.exports = app;
