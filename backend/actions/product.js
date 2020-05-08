const { Product, Review } = require('../models/index');

const getProducts = async (req, res) => {
  let perPage = 5; // Change Later

  let { name, averageRating, category, sort, page } = req.query;

  // , { seller: new RegExp(name || "", "i") }
  let where;
  if (req.query.email) {
    where = { 'seller.email': req.query.email };
  } else {
    where = req.user.type === 'Seller' ? { 'seller.id': req.user.id } : {};
  }
  const result = await Product.find(where)
    .populate('reviews')
    .or([{ name: new RegExp(name || '', 'i') }])
    .where({ category: category || { $ne: null } })
    .where({ averageRating: { $gte: averageRating || 0 } })
    .sort(sort)
    .limit(perPage)
    .skip(perPage * (page - 1));

  const count = await Product.find(where)
    .or([{ name: new RegExp(name || '', 'i') }])
    .where({ category: category || { $ne: null } })
    .where({ averageRating: { $gte: averageRating || 0 } })
    .countDocuments();

  res.send({ products: result, total: count, limit: perPage });
};

const addProduct = async (req, res) => {
  if (req.user && req.user.type && req.user.type === 'Seller') {
    const newProduct = new Product({
      seller: { id: req.user.id, name: req.user.name },
      name: req.body.name,
      addonCost: req.body.addonCost,
      baseCost: req.body.baseCost,
      category: req.body.category,
      description: req.body.description,
      images: req.files.map((file) => file.location),
      offers: JSON.parse(req.body.offers),
    });
    const result = await newProduct.save();
    res.send(result);
    return res.send('good');
  }
  req.status(401).send('Unauthorized');
};

const updateProduct = async (req, res) => {
  console.log(req.user);
  console.log(req.body);
  console.log(req.files);

  if (req.user && req.user.type && req.user.type === 'Seller') {
    const product = await Product.findById(req.body.id);
    if (product) {
      const result = await product.save();
      return res.send(result);
    }
    return res.status(400).send('Invalid Request');
  }
  return res.status(401).send('Unauthorized');
};

const deleteProduct = async (req, res) => {
  if (req.user && req.user.type && req.user.type === 'Seller') {
    const result = await Product.findByIdAndDelete(req.body.id);
    return res.send(result);
  }
  return res.status(401).send('Unauthorized');
};

const addReview = async (req, res) => {
  const { id, name } = req.user;
  const newReview = new Review({
    ...req.body,
    customer: {
      id, name
    }
  });
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


const viewProduct = async (req, res) => {
  if (req.user && req.user.type && req.user.type === 'Customer') {
    const product = await Product.findById(req.body.id);
    const date = new Date.now();
    return res.send(result);
  }
  return res.status(401).send('Unauthorized');
};

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addReview,
};
