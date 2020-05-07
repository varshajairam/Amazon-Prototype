const { Cart } = require('../models/index');
const { Product } = require('../models/index');
const { SavedForLater } = require('../models/index');

const removeProduct = async (product, args) => {
  const saved = await SavedForLater.findOne(
    { 'items.customer': 1 },
  ); // req.user
  const index = saved.items[0].products.findIndex((item) => item.product == product);
  if (index > -1) {
    saved.items[0].products.splice(index, 1);
    await saved.save();
  }
  const response = await getProductDetail(args.req, SavedForLater);
  return response;
};

const getProductDetail = async (req, model) => {
  const perPage = 5; // Change Later

  const saved = await model.findOne({ 'items.customer': 1 }); // req.user
  if (saved) {
    const products = [];
    for (const item of saved.items[0].products) {
      const product = await Product.findOne({ _id: item.product });
      products.push({ product, quantity: item.quantity, cost: item.cost, totalCost: saved.items[0].totalCost, isGift: item.isGift });
    }
    return products;
  }
  return 'Empty';
};

const getProducts = async (req, res) => {
  const products = await getProductDetail(req, SavedForLater);
  res.send(products);
};

const moveToCart = async (req, res) => {
  const customerCart = await Cart.findOne({ 'items.customer': 1 }); // req.user
  let response;

  const fullProduct = await Product.findOne({ _id: req.body.product });
  req.body.cost = (fullProduct.baseCost * req.body.quantity) + fullProduct.addonCost;
  if (JSON.parse(req.body.isGift)) {
    req.body.cost += 1.0;
  }

  if (customerCart) {
    customerCart.items[0].products.unshift(req.body);
    customerCart.items[0].totalCost += req.body.cost;
    await customerCart.save();
    response = await getProductDetail(req, Cart);
  }

  const savedResponse = await removeProduct(req.body.product, req);

  res.send({ response, savedResponse });
};

const removeSavedProduct = async (req, res) => {
  const result = await removeProduct(req.body.product, req);
  res.send(result);
};

module.exports = {
  getProducts,
  moveToCart,
  removeSavedProduct,
};
