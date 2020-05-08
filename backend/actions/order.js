const { Order } = require("../models/index");

const getOrders = async (req, res) => {
  if (req.user) {
    let query = {};
    if (req.user.type === "Seller") {
      query = { sellers: req.user.id };
      const result = await Order.find(query).sort({ createdAt: 1 });
      const orders = result.map((order) => {
        return {
          shippingAddress: order.shippingAddress,
          billingAddress: order.billingAddress,
          card: order.card,
          status: order.status,
          cost: order.cost,
          customer: order.customer,
          statusHistory: order.statusHistory,
          products: order.products.filter(
            (product) =>
              product.product.seller &&
              product.product.seller.id === req.user.id
          ),
        };
      });
      return res.send(orders);
    } else if (req.user.type === "Customer") {
      query = { customer: req.user.id };
      const result = await Order.find(query).sort({ createdAt: 1 });
      return res.send({ orders: result });
    }
    const result = await Order.find(query).sort({ createdAt: 1 });
    return res.send({ orders: result });
  } else {
    res.status(401).send("Unauthorized");
  }
};

const updateOrder = async (req, res) => {
  if (req.user) {
    if (req.user.type === "Customer") {
      const order = await Order.findById(req.body.id);
      if (order) {
        if (req.body.status) {
          order.statusHistory.append({ status: req.body.status });
          order.status = req.body.status;
          const result = await order.save();
          return res.send(result);
        } else {
          order.products = order.products.filter(
            (product) => product.product._id != req.body.productId
          );
          order.cost = order.products.reduce((sum = 0, product) => {
            return sum +
              product.quantity * product.product.baseCost +
              product.isGift
              ? 2
              : 0;
          });
          await order.save();
        }
      }
    } else {
      const order = await Order.findById(req.body.id);
      if (order) {
        order.statusHistory.append({ status: req.body.status });
        order.status = req.body.status;
        const result = await order.save();
        return res.send(result);
      }
    }
    req.status(400).send("Invalid Request");
  }
  req.status(401).send("Unauthorized");
};

const placeOrder = async (req, res) => {
  
  console.log(JSON.parse(req.body.products));
  console.log(JSON.parse(req.body.shippingAddress));
  console.log(JSON.parse(req.body.statusHistory));

  console.log(JSON.parse(req.body.card));
  console.log(typeof req.body.sellers);
  console.log(req.body.sellers.split(','));

  if (req.user && req.user.type && req.user.type === "Customer") {
    const newOrder = new Order({
      customer: req.user.id,
      ...req.body,
      sellers: req.body.sellers.split(','),
      card: JSON.parse(req.body.card),
      shippingAddress: JSON.parse(req.body.shippingAddress),
      billingAddress: JSON.parse(req.body.billingAddress),
      products: JSON.parse(req.body.products),
      statusHistory: JSON.parse(req.body.statusHistory),
    });
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
