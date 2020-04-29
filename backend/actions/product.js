const { Product } = require('../models/index');

const getProducts = async (req, res) => {
  let perPage = 5; // Change Later

  let { name, rating, category, sort, page } = req.query;
  console.log('name, rating, category, sort', name, rating, category, sort)
  // , { seller: new RegExp(name || "", "i") }
  const result = await Product.find()
    .or([{ name: new RegExp(name || "", "i") }])
    .where({ 'category': category || { $ne: null } })
    .sort(sort)
    .limit(perPage)
    .skip(perPage * (page - 1))
  // .where('rating').gte(rating);

  const count = await Product.find()
    .or([{ name: new RegExp(name || "", "i") }])
    .where({ 'category': category || { $ne: null } })
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

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};