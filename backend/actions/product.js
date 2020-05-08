const { Product, Review } = require("../models/index");
const client = require('../models/redisClient/redis');

const getRecomendations = async (req, res) => {
  const result = await Product.aggregate([
    {
      $match:
        req.user && req.user.type === "Seller"
          ? { "seller.id": req.user.id }
          : {},
    },
    {
      $group: {
        _id: "$category",
        products: {
          $push: {
            _id: "$_id",
            images: "$images",
            addonCost: "$addonCost",
            offers: "$offers",
            name: "$name",
            baseCost: "$baseCost",
            category: "$category",
            description: "$description",
            seller: "$seller",
            averageRating: "$averageRating",
            reviews: "$reviews",
          },
        },
      },
    },
    { $project: { products: { $slice: ["$products", 5] } } },
  ]);
  await Review.populate(result, { path: "products.reviews" });

  res.send(result);
};

const getProduct = async (req, res) => {
  const result = await Product.findById(req.body.id).populate("reviews");
  res.send(result);
};

const getProducts = async (req, res) => {

const products = await client.hgetall(`${req.originalUrl}`, (err, success) => {
    if (err || !success) {
      console.log(err, !success);
      return null;
    }
    console.log('Success is ', success);
    console.log('From Redis');
    return success;
  });

  if(products.length > 0) {
    res.send(JSON.parse(products.results));
  }
  const perPage = 5; 
  const { name, averageRating, category, sort, page } = req.query;

  let where;
  if (req.query.email) {
    where = { "seller.email": req.query.email };
  } else {
    where = req.user.type === "Seller" ? { "seller.id": req.user.id } : {};
  }
  const result = await Product.find(where)
    .populate("reviews")
    .or([
      { name: new RegExp(name || "", "i") },
      { "seller.name": new RegExp(name || "", "i") },
    ])
    .where({ category: category || { $ne: null } })
    .where({ averageRating: { $gte: averageRating || 0 } })
    .sort(sort)
    .limit(perPage)
    .skip(perPage * ((page || 1) - 1));

  const count = await Product.find(where)
    .or([
      { name: new RegExp(name || "", "i") },
      { "seller.name": new RegExp(name || "", "i") },
    ])
    .where({ category: category || { $ne: null } })
    .where({ averageRating: { $gte: averageRating || 0 } })
    .countDocuments();

  const obj = {products: result, total: count, limit: perPage}
  let results = JSON.stringify(obj);
  client.hmset(`${req.originalUrl}`, {results}, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      console.log(success);
      return success;
    }
  });

  res.send({ products: result, total: count, limit: perPage });
};

const addProduct = async (req, res) => {
  if (req.user && req.user.type && req.user.type === "Seller") {
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
    return res.send("good");
  }
  req.status(401).send("Unauthorized");
};

const updateProduct = async (req, res) => {
  const { name, baseCost, category, description, images, offers } = req.body;
  if (req.user && req.user.type && req.user.type === "Seller") {
    const product = await Product.findById(req.body.id);
    if (product) {
      product.name = name;
      product.baseCost = baseCost;
      product.category = category;
      product.description = description;
      product.offers = JSON.parse(offers);
      product.images = [
        ...images.split(","),
        ...req.files.map((file) => file.location),
      ];
      const result = await product.save();
      return res.send(result);
    }
    return res.status(400).send("Invalid Request");
  }
  return res.status(401).send("Unauthorized");
};

const deleteProduct = async (req, res) => {
  if (req.user && req.user.type && req.user.type === "Seller") {
    const result = await Product.findByIdAndDelete(req.body.id);
    return res.send(result);
  }
  return res.status(401).send("Unauthorized");
};

const addReview = async (req, res) => {
  const { id, name, email } = req.user;
  const newReview = new Review({
    ...req.body,
    customer: {
      id,
      name,
      email,
    },
  });
  const result = await newReview.save();
  let product = await Product.findById(req.body.product).populate("reviews");

  if (product && result) {
    product.reviews.push(result);
    let total = 0;
    product.reviews.forEach((current) => (total += current.stars));
    product.averageRating = Math.floor(total / product.reviews.length);
    product = await product.save();
    return res.send(result);
  }
  res.send("Error Occurred");
};

const addView = async (req, res) => {
  if (req.user && req.user.type && req.user.type === "Customer") {
    const product = await Product.findById(req.body.id);
    let newViews = product.views ? { ...product.views } : {};
    if (product.views[new Date().toLocaleDateString()]) {
      newViews[new Date().toLocaleDateString()] += 1;
    } else {
      newViews[new Date().toLocaleDateString()] = 1;
    }
    const result = await Product.findByIdAndUpdate(req.body.id, {
      views: newViews,
    });

    return res.send(result);
  }
  return res.send("Unauthorized");
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
