const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = Category = mongoose.model('category', CategorySchema);
