const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'product',
  },
  customer: { type: mongoose.Schema.Types.Number, required: true },
  quantity: {
    type: mongoose.Schema.Types.Number,
    required: true,
    default: 1,
    min: 1,
  },
  isGift: { type: mongoose.Schema.Types.Boolean, required: true },
});

module.exports = Cart = mongoose.model('cart', CartSchema);
