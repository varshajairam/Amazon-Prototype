const { Order } = require('../models/mongo');
const {ObjectId} = require('mongodb');//to get timesptamp from id

const getAnalytics = async (req, res) => {

  const analyticsOptions = {analyticsOptions: ['No of orders per day', 'Top 5 most sold products', 'Top 5 sellers based on total sales amount',
    'Top 5 customers based on total purchase amount', 'Top 10 products based on rating', 'Top 10 products viewed per day']};
  res.send(analyticsOptions);
}

const getOrdersPerDay = async (req, res) => {
  const orderList = await Order.find();
  res.send(orderList);
};

const getTopSoldProducts = async (req, res) => {
  const orderList = await Order.find();
  res.send(orderList);
};

const getTopSeller = async (req, res) => {
  const orderList = await Order.find();
  res.send(orderList);
};

const getTopCustomer = async (req, res) => {
  const orderList = await Order.find();
  res.send(orderList);
};

const getTopProducts = async (req, res) => {
  const orderList = await Order.find();
  res.send(orderList);
};

const getTopProductsViewed = async (req, res) => {
  const orderList = await Order.find();
  res.send(orderList);
};

module.exports = {
  getAnalytics,
  getOrdersPerDay,
  getTopSoldProducts,
  getTopSeller,
  getTopCustomer,
  getTopProducts,
  getTopProductsViewed,
};
