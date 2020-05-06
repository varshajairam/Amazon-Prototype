const express = require('express');

const app = express();
const {
  getProfile, addProfileImage, editProfile,
} = require('../actions/profile');

app.post('/get_profile', getProfile);
app.post('/add_profile_image', addProfileImage);
app.post('/edit_profile', editProfile);

module.exports = app;
