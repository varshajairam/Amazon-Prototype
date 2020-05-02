const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  stars: {
    type: mongoose.Schema.Types.Number,
    min: 1,
    max: 5,
    required: true,
  },

  title: { type: mongoose.Schema.Types.String },

  text: { type: mongoose.Schema.Types.String },

  /**
   * TODO: add required tag and ref to cutomer model
   */
  customer: { type: mongoose.Schema.Types.ObjectId },

  date: { type: mongoose.Schema.Types.Date, default: Date.now() },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'product',
  },
});

module.exports = Review = mongoose.model('review', ReviewSchema);
