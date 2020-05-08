const {
  Product, Review, Order, Category,
} = require('../models/index');

const getTopFiveSoldProducts = async (req, res) => {
  if (req.user && req.user.type === 'Admin') {
    const result = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $project: { products: '$products' } },

      { $unwind: '$products' },
      { $group: { _id: '$products.product._id', quantity: { $sum: '$products.quantity' } } },
      { $sort: { quantity: -1 } },
      { $limit: 5 },
    ]);
    await Product.populate(result, { path: '_id' });
    console.log(result);

    return res.send(result);
  }
  res.status(401).send('Unauthorized');
};


const getTopTenProductsViewed = async (req, res) => {
  const { date } = req.query;
  if (req.user && req.user.type === 'Admin') {
    const result = await Product.aggregate([
      { $match: { [`views.${date}`]: { $ne: undefined } } },
      { $sort: { [`views.${date}`]: -1 } },
      { $limit: 10 },
    ]);
    await Review.populate(result, { path: 'reviews' });
    console.log(result);

    return res.send(result);
  }
  res.status(401).send('Unauthorized');
};

const getNoOfOrders = async (req, res) => {
	console.log(req.query);
  const startDate = new Date(req.query.date);
  const endDate = new Date(req.query.date);
  endDate.setDate(endDate.getDate() + 1);
  if (req.user && req.user.type === 'Admin') {
    const result = await Order.aggregate([
      { $match: { createdAt: { $lt: endDate, $gt: startDate } } },
      { $count: 'quantity' },
    ]);

    return res.send(...result);
  }
  res.status(401).send('Unauthorized');
};

const getTopTenProductsBasedOnRatings = async (req, res) => {
  if (req.user && req.user.type === 'Admin') {
    const result = await Product.aggregate([
      { $match: { averageRating: { $ne: undefined } } },
      { $sort: { averageRating: -1 } },
      { $limit: 10 },
    ]);
    await Review.populate(result, { path: 'reviews' });
    console.log(result);

    return res.send(result);
  }
  res.status(401).send('Unauthorized');
};

const getTopTenCustomersBasedOnPurchaseAmount = async (req, res) => {
  if (req.user && req.user.type === 'Admin') {
    const result = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      //   { $project: { products: '$products' } },
      //   { $unwind: '$products' },
      //   { $project: {customerObj: {_id: '$customer'}}},
      { $group: { _id: null, customer: { $addToSet: '$customer' }, total: { $sum: '$cost' } } },
      //   { $sort: { quantity: -1 } },
      //   { $limit: 5 },
    ]);
    await Order.populate(result, { path: '_id' });
    console.log(result);

    return res.send(result);
  }
  res.status(401).send('Unauthorized');
};

const getSellerProducts = async (req, res) => {
  if (req.user && req.user.type === "Seller") {
    const result = await Order.aggregate([
      { $match: { status: { $ne: "Cancelled" }, sellers: req.user.id } },
      { $project: { products: "$products" } },
      { $match: { "products.product.seller.id": req.user.id } },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product._id",
          product: { $push: "$products.product" },
        },
      },
    ]);
    return res.send(result);
  }
  res.status(401).send("Unauthorized");
};

const getSellerMonthlySales = async (req, res) => {
  const startDate = new Date(+req.query.startDate);
  const endDate = new Date(+req.query.endDate);

  if (req.user && req.user.type !== "Customer") {
    const result = await Order.aggregate([
      { $match: { createdAt: { $lt: endDate, $gt: startDate } } },
      { $match: { status: { $ne: "Cancelled" }, sellers: +req.query.id || req.user.id } },
      { $project: { products: "$products" } },
      { $match: { "products.product.seller.id": +req.query.id || req.user.id } },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product._id",
          product: { $push: "$products.product" },
        },
      },
    ]);
    return res.send(
      result
        .filter(
          (order) =>
            order.product[0].seller &&
            order.product[0].seller.id === +req.query.id || req.user.id
        )
        .map(({ _id, product }) => {
          return { _id, product: product[0], quantity: product.length };
        })
    );
  }
  res.status(401).send("Unauthorized");
};

module.exports = {
  getTopFiveSoldProducts,
  getSellerProducts,
  getTopTenProductsViewed,
  getNoOfOrders,
  getTopTenProductsBasedOnRatings,
  getTopTenCustomersBasedOnPurchaseAmount,
  getSellerMonthlySales,
};
