const request = require('request');
const { Product, Category } = require('../models/index');
const client = require('../models/redisClient/redis');

const getProducts = (req, res) => {
//   console.log(req.query);

//   const result = await Product.find(req.query);
//   res.send({ products: result });
 Product.find(req.query).then((product) =>
   { res.send(product); }
 );
  // res.send({ res: 'Success' });
};

const getProductsRedis = async (req, res) => {
  try {
	const products = await client.hgetall(`all_products`, (err, success) => {
		if(err) 
			console.log(err);
		if(success){
			console.log(JSON.parse(success.results));
			res.send({ products: JSON.parse(success.results) });
		}
	});
    // result = await Product.find(req.query);
    // res.send({ products: "result" });
  } catch (err) {
	  return ('Error');
  }
};

function str2Val(str) {
	const keys = str.split(/[\.\[\]'"]/).filter(e => e);
	let ret = {};
	
	try {
	  keys.forEach(key => {
		ret = ret[key];
	  });
	  return ret;
	} catch(e) {
	  return undefined;
	}
  }


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
			category: category._id,
        },
  	  },
  	  (error, res, body) => {
        if (error) {
  		  console.error(error);
        }
        //   res.send({statusCode: res.statusCode});
  	  },
    );
  }
  res.send('Successful');
};


const addMassProductsRedis = async (req, res) => {
	const result = await Product.find(req.query);
	if (result) {
		console.log(result);
		let results = JSON.stringify(result);
		client.hmset(`all_products`,   {results}, (err, success) => {
			if (err) {
				console.log("err");
			} else {
				 console.log("success");
				 return res.status(200).send(result);
			}
		});
	}
}

const addProduct = async (req, res) => {
  const newProduct = new Product({ ...req.body });
  const result = await newProduct.save();

  if (result) {
	  console.log(result._doc);
	  client.hmset(`all_products`,  {result: result._doc.toString()} , (err, success) => {
      if (err) {
       console.log(err);
		  } else {
        console.log("success");
        return res.status(200).send(result);
		  }
	  });
  }
  // res.send(result);
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
  getProductsRedis,
  addMassProductsRedis
};
