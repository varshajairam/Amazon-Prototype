const { Category } = require('../models/mongo');

const addCategory = async (req, res) => {
  const newCategory = new Category({ name: req.body.name });
  const result = await newCategory.save();
  res.send(result);
};

const getCategories = async (req, res) => {
  res.send(await Category.find());
};

module.exports = {
  addCategory,
  getCategories,
};
