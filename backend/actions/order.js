const { Order } = require('../models/index');

const getOrders = async (req, res) => {
  let perPage = 5; // Change Later

  const result = await Order.find()
    .limit(perPage)
    .skip(perPage * (page - 1));

  const count = await Order.find().countDocuments();

  res.send({ products: result, total: count, limit: perPage });
};

const placeOrder = async (req, res) => {
  if (req.user && req.user.type && req.user.type === 'Customer') {
    const newOrder = new Order({customer: req.user.id, ...req.body});
    const result = await newOrder.save();
    res.send(result);
    return res.send('good');
  }
  req.status(401).send('Unauthorized');
};

module.exports = {
    placeOrder,
  getOrders,
};
