const { Product } = require('../models/index');
const { Review } = require('../models/index');

const getProducts = async (req, res) => {
  let perPage = 5; // Change Later

  let { name, averageRating, category, sort, page } = req.query;

  // , { seller: new RegExp(name || "", "i") }
  const result = await Product.find()
    .populate('reviews')
    .or([{ name: new RegExp(name || '', 'i') }])
    .where({ category: category || { $ne: null } })
    .where({ averageRating: { $gte: averageRating || 0 } })
    .sort(sort)
    .limit(perPage)
    .skip(perPage * (page - 1));

  const count = await Product.find()
    .or([{ name: new RegExp(name || '', 'i') }])
    .where({ category: category || { $ne: null } })
    .where({ averageRating: { $gte: averageRating || 0 } })
    .countDocuments();

  res.send({ products: result, total: count, limit: perPage });
};

const addProduct = async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    addonCost: req.body.addonCost,
    baseCost: req.body.baseCost,
    category: req.body.category,
    description: req.body.description,
    seller: req.body.seller,
    images: req.files.map((file) => file.location),
    offers: JSON.parse(req.body.offers),
  });
  const result = await newProduct.save();
  res.send(result);
};

const updateProduct = async (req, res) => {
  const product = await Product.findById(req.body.id);
  if (product) {
    const result = await product.save();
    return res.send(result);
  }
  res.send('TODO:ERROR HANDLING');
};

const deleteProduct = async (req, res) => {
  const result = Product.deleteOne({ id: req.id });
  res.send(result);
};

const addReview = async (req, res) => {
  const newReview = new Review({ ...req.body });
  const result = await newReview.save();
  let product = await Product.findById(req.body.product).populate('reviews');

  if (product && result) {
    product.reviews.push(result);
    let total = 0;
    product.reviews.forEach((current) => (total += current.stars));
    product.averageRating = total / product.reviews.length;
    product = await product.save();
    return res.send(result);
  }
  res.send('Error Occurred');
};

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addReview,
};
