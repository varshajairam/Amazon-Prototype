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
      { $group: { _id: null, customer: { $addToSet: '$customer'}, total: { $sum: '$cost' } } },
    //   { $sort: { quantity: -1 } },
    //   { $limit: 5 },
    ]);
    await Order.populate(result, { path: '_id' });
    console.log(result);

    return res.send(result);
  }
  res.status(401).send('Unauthorized');
};

module.exports = {
  getTopFiveSoldProducts,
  getTopTenProductsViewed,
  getNoOfOrders,
  getTopTenProductsBasedOnRatings,
  getTopTenCustomersBasedOnPurchaseAmount,
};
