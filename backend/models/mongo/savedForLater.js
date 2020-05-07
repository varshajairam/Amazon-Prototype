const mongoose = require('mongoose');

const SavedForLaterSchema = new mongoose.Schema({
  items: [{
    customer: { type: mongoose.Schema.Types.Number, required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'product',
        },
        quantity: {
          type: mongoose.Schema.Types.Number,
          required: true,
          default: 1,
          min: 1,
        },
        isGift: { type: mongoose.Schema.Types.Boolean, required: true },
      },
    ],
  }],
});

module.exports = SavedForLater = mongoose.model(
  'savedForLater',
  SavedForLaterSchema,
);
