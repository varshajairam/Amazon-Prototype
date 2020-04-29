const request = require('request');
const { Product, Category } = require('../models/index');

const getProducts = async (req, res) => {
  console.log(req.query);

  const result = await Product.find(req.query);
  res.send({ products: result });


  // res.send({ res: 'Success' });
};

const massEntryProducts = async (req, res) => {
  for (let i = 9000; i < 10000; i++) {
  
	const category = await Category.findOne({ name: 'category10' });

  request.post(
  	  'http://localhost:3001/product',
  	  {
      json: {
  		  name: `Product${i}`,
  		  description: `Description${i}`,
  		  baseCost: 100,
  		  seller: 1,
  		  category: category._id
      },
  	  },
  	  (error, res, body) => {
      if (error) {
  		  console.error(error);
  		  return;
      }
    //   res.send({statusCode: res.statusCode});
  	  },
  );
    }
  res.send("Successful");
};


const addProduct = async (req, res) => {
  const newProduct = new Product({ ...req.body });
  const result = await newProduct.save();
  res.send(result);
//   res.send('added productsuccessfully, this is what you sent me');
};

const updateProduct = async (req, res) => {
  const newProduct = new Product({ ...req.body });
  const result = await newProduct.save();
  res.send(result);
  res.send('added product successfully, this is what you sent me');
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
  massEntryProducts,
};
