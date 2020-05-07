const express = require('express');

const app = express();
const {
  getProfile, addProfileImage, editProfile, addAddress, deleteAddress,
} = require('../actions/profile');

app.post('/get_profile', getProfile);
app.post('/add_profile_image', addProfileImage);
app.post('/edit_profile', editProfile);
app.post('/add_address', addAddress);
app.post('/delete_address', deleteAddress);

module.exports = app;
