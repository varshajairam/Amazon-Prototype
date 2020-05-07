const mongoose = require('mongoose');

const SavedForLaterSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'product',
  },
  customer: { type: mongoose.Schema.Types.Number, required: true },
},
{
  timestamps: true,
});

module.exports = SavedForLater = mongoose.model(
  'savedForLater',
  SavedForLaterSchema
);
