const { Category } = require('../models/mongo');
const { Product } = require('../models/mongo');

const addCategory = async (req, res) => {
  console.log('in addCategory');
  const { category } = req.body;
  console.log(req.body);
  Category.create({ name: category }).then(() => {
    res.send(req.body);
  });
};

const getCategories = async (req, res) => {
  res.send(await Category.find());
};

const deleteCategory = async (req, res) => {
  console.log('in deleteCategory');
  const { _id } = req.body;
  console.log(req.body);
  const result = await Product.find({ category: _id });
  if (result.length > 0) {
    res.status(400).send('Failed');
  } else {
    Category.remove({ _id }).then(() => {
      res.status(200).send(req.body);
    });
  }
};

module.exports = {
  addCategory,
  getCategories,
  deleteCategory,
};
