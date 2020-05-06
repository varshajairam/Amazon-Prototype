const mongoose = require('mongoose');
const Product = require('./product');
const Category = require('./category');
const Review = require('./review');
const Cart = require('./cart');
const SavedForLater = require('./savedForLater');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 500,
      bufferMaxEntries: 0,
    });
    console.log(`mongoDB Connected`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connectDB, Product, Category, Review, Cart, SavedForLater };
