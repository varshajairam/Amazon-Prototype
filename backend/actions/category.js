const { Category } = require('../models/mongo');

const addCategory = async (req, res) => {
	console.log('in addCategory');
	const { category } = req.body;
	console.log(req.body);
	Category.create({ name: category}).then(() => {
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
    // const result = await Category.findByIdAndDelete(req.body.id);
	// return res.send(result);
	Category.remove({ _id}).then(() => {
		res.send(req.body);
	});
};

module.exports = {
  addCategory,
  getCategories,
  deleteCategory,
};
