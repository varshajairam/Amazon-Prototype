const { Product } = require('../models/index');

const getProducts = async (req, res) => {
  console.log(req.query);

  // const result = await Product.find(req.query);
  // res.send({ products: result });


  res.send({ res: 'Success' });
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