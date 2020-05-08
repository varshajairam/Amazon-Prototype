const { Order } = require("../models/index");

const getOrders = async (req, res) => {
  if (req.user) {
    let query = {};
    if (req.user.type === "Seller") {
      query = { sellers: req.user.id };
    } else {
      query = { customer: req.user.id };
    }
    const result = await Order.find(query);
    res.send({ orders: result });
  } else {
    res.status(401).send("Unauthorized");
  }
};

const updateOrder = async (req, res) => {
  if (req.user) {
    const order = await Order.findById(req.body.id);
    if (order) {
      order.statusHistory.append({ status: req.body.status });
      order.status = req.body.status;
      const result = await order.save();
      res.send(result);
    }
    req.status(400).send("Invalid Request");
  }
  req.status(401).send("Unauthorized");
};

const placeOrder = async (req, res) => {
  if (req.user && req.user.type && req.user.type === "Customer") {
    const newOrder = new Order({ customer: req.user.id, ...req.body });
    const result = await newOrder.save();
    return res.send(result);
  }
  req.status(401).send("Unauthorized");
};

module.exports = {
  placeOrder,
  getOrders,
  updateOrder,
};
