const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: { type: mongoose.Schema.Types.String, required: true },
  images: {
    type: [{ type: mongoose.Schema.Types.String }],
    validate: [
      (val) => {
        return val.length <= 5;
      },
      "number of product Images can't exceed 5",
    ],
  },
  baseCost: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  addonCost: {
    type: mongoose.Schema.Types.Number,
    default: 5.0,
  },
  offers: [
    {
      offerType: {
        type: String,
        enum: ['percentage', 'flat'],
        required: true,
      },
      offerValue: {
        type: Number,
        default: 5.0,
      },
    },
  ],
  seller: { type: mongoose.Schema.Types.Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'category',
  },
  averageRating: { type: mongoose.Schema.Types.Number, default: 0 },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'review',
    },
  ],
});

module.exports = Product = mongoose.model('product', ProductSchema);
