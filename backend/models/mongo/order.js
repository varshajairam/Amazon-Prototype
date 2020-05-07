const mongoose = require('mongoose');
const Product = require('./product');

const OrderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: {
          name: {
            type: String,
            trim: true,
            required: true,
          },
          description: { type: mongoose.Schema.Types.String, required: true },
          image: { type: mongoose.Schema.Types.String },
          baseCost: {
            type: mongoose.Schema.Types.Number,
            required: true,
          },
          appliedOffers: [
            {
              type: {
                type: String,
                enum: ['percentage', 'flat'],
                required: true,
              },
              value: {
                type: Number,
                default: 5.0,
              },
            },
          ],
          seller: {
            id: { type: mongoose.Schema.Types.Number, required: true },
            name: { type: mongoose.Schema.Types.String, required: true },
          },
          category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'category',
          }
        },
        required: true,
      },
      productListing: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'product',
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'category',
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
  cost: { type: mongoose.Schema.Types.Number, required: true },
  customer: { type: mongoose.Schema.Types.Number, required: true },
  sellers: [{ type: mongoose.Schema.Types.Number, required: true }],
  shippingAddress: {
    name: { type: mongoose.Schema.Types.String, required: true },
    address1: { type: mongoose.Schema.Types.String, required: true },
    address2: { type: mongoose.Schema.Types.String },
    city: { type: mongoose.Schema.Types.String, required: true },
    zip: { type: mongoose.Schema.Types.String, required: true },
    state: {
      type: mongoose.Schema.Types.String,
      required: true,
    } /* use enum for state */,
    phone: { type: mongoose.Schema.Types.String, required: true },
  },

  billingAddress: {
    name: { type: mongoose.Schema.Types.String, required: true },
    address1: { type: mongoose.Schema.Types.String, required: true },
    address2: { type: mongoose.Schema.Types.String },
    city: { type: mongoose.Schema.Types.String, required: true },
    zip: { type: mongoose.Schema.Types.String, required: true },
    state: {
      type: mongoose.Schema.Types.String,
      required: true,
    } /* use enum for state */,
    phone: { type: mongoose.Schema.Types.String, required: true },
  },

  card: {
    name: { type: mongoose.Schema.Types.String, required: true },
    cvv: {
      type: mongoose.Schema.Types.Number,
      min: 100,
      max: 9999,
      required: true,
    },
    number: { type: mongoose.Schema.Types.String, required: true },
    expiration: { type: mongoose.Schema.Types.Date, required: true },
  },

  status: {
    type: mongoose.Schema.Types.String,
    enum: [
      'New',
      'Packing',
      'Shipping',
      'Package arrived',
      'Out for Delivery',
      'Delivered',
      'Cancelled',
    ],
    default: 'New',
  },

  statusHistory: [
    {
      status: {
        type: mongoose.Schema.Types.String,
        enum: [
          'New',
          'Packing',
          'Shipping',
          'Package arrived',
          'Out for Delivery',
          'Delivered',
          'Cancelled',
        ],
      },
      timestamp: { type: mongoose.Schema.Types.Date, default: Date.now },
    },
  ],
},
{
  timestamps: true,
});

module.exports = Order = mongoose.model('order', OrderSchema);
