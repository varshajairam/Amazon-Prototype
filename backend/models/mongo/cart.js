const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  items: [{
    customer: { type: mongoose.Schema.Types.Number, required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'product' },
        quantity: {
          type: mongoose.Schema.Types.Number,
          required: true,
          default: 1,
          min: 1,
        },
        isGift: { type: mongoose.Schema.Types.Boolean, required: true },
        cost: { type: mongoose.Schema.Types.Number, default: 0, required: true },
      },
    ],
    totalCost: { type: mongoose.Schema.Types.Number, default: 0, required: true },
    giftCharge: { type: mongoose.Schema.Types.Number, default: 1.0 },
    deliveryCharge: { type: mongoose.Schema.Types.Number, default: 2.50 },
  }],
},
  {
    timestamps: true,
  });

module.exports = Cart = mongoose.model('cart', CartSchema);
