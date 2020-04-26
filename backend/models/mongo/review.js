const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  stars: {
    type: mongoose.Schema.Types.Number,
    min: 1,
    max: 5,
    required: true,
  },

  text: { type: mongoose.Schema.Types.String },

  /**
   * TODO: add required tag and ref to cutomer model
   */
  customer: { type: mongoose.Schema.Types.ObjectId },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'product',
  },
});

module.exports = Product = mongoose.model('product', ProductSchema);
