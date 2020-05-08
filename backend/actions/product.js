const { Product, Review } = require('../models/index');

const getRecomendations = async (req, res) => {
  const result = await Product.aggregate([
    { $match: (req.user && req.user.type === 'Seller' ? { "seller.id": req.user.id } : {}) },
    {
      $group: {
        _id: '$category',
        products: {
          $push: {
            _id: '$_id',
            images: '$images',
            addonCost: '$addonCost',
            offers: '$offers',
            name: '$name',
            baseCost: '$baseCost',
            category: '$category',
            description: '$description',
            seller: '$seller',
            averageRating: '$averageRating',
            reviews: '$reviews',
          },
        },
      },
    },
    { $project: { products: { $slice: ['$products', 5] } } },
    // { $lookup: {
    //   from: "$review",
    //   localField: "reviews",
    //   foreignField: "_id",
    //   as: "reviews"
    // }}
  ]);
  await Review.populate(result, { path: "products.reviews" });
  // const reviews = await Review.find().where('_id').in(result.reviews).exec(); //result.reviews.map(reviewId)

  res.send(result);
};

const getProduct = async (req, res) => {
  const result = await Product.findById(req.body.id);
  res.send(result);
};

const getProducts = async (req, res) => {
  const perPage = 5; // Change Later

  const {
    name, averageRating, category, sort, page,
  } = req.query;

  // , { seller: new RegExp(name || "", "i") }
  let where;
  if (req.query.email) {
    where = { 'seller.email': req.query.email };
  } else {
    where = req.user.type === 'Seller' ? { 'seller.id': req.user.id } : {};
  }
  const result = await Product.find(where)
    .populate('reviews')
    .or([{ name: new RegExp(name || '', 'i') }, { 'seller.name': new RegExp(name || '', 'i') }])
    .where({ category: category || { $ne: null } })
    .where({ averageRating: { $gte: averageRating || 0 } })
    .sort(sort)
    .limit(perPage)
    .skip(perPage * ((page || 1) - 1));

  const count = await Product.find(where)
    .or([{ name: new RegExp(name || '', 'i') }, { 'seller.name': new RegExp(name || '', 'i') }])
    .where({ category: category || { $ne: null } })
    .where({ averageRating: { $gte: averageRating || 0 } })
    .countDocuments();

  res.send({ products: result, total: count, limit: perPage });
};

const addProduct = async (req, res) => {
  if (req.user && req.user.type && req.user.type === 'Seller') {
    const newProduct = new Product({
      seller: { id: req.user.id, name: req.user.name, email: req.user.email },
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

  const { name, baseCost, category, description, images, offers } = req.body;
  if (req.user && req.user.type && req.user.type === 'Seller') {
    const product = await Product.findById(req.body.id);
    if (product) {
      product.name = name;
      product.baseCost = baseCost;
      product.category = category;
      product.description = description;
      product.offers = JSON.parse(offers);
      product.images = [...JSON.parse(images), ...req.files.map((file) => file.location)];
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
  const { id, name, email } = req.user;
  const newReview = new Review({
    ...req.body,
    customer: {
      id,
      name,
      email
    },
  });
  const result = await newReview.save();
  let product = await Product.findById(req.body.product).populate('reviews');

  if (product && result) {
    product.reviews.push(result);
    let total = 0;
    product.reviews.forEach((current) => (total += current.stars));
    product.averageRating = Math.floor(total / product.reviews.length);
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

const addView = async (req, res) => {
  if (req.user && req.user.type && req.user.type === 'Customer') {
    const product = await Product.findById(req.body.id);
    let newViews = product.views ? { ...product.views } : {};
    if (product.views[new Date().toLocaleDateString()]) {
      newViews[new Date().toLocaleDateString()] += 1;
    } else {
      newViews[new Date().toLocaleDateString()] = 1;
    }
    const result = await Product.findByIdAndUpdate(req.body.id, { views: newViews });

    return res.send(result);
  }
  return res.send('Unauthorized');
};

module.exports = {
  getRecomendations,
  getProduct,
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addReview,
  addView,
};
