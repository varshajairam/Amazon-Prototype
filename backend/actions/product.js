const { Product } = require('../models/index');

const addProduct = async (req, res) => {
  const newProduct = new Product({...req.body});
  const result = await newProduct.save();
  res.send(result);
  res.send(`added productsuccessfully, this is what you sent me`);
};

const updateProduct = async (req, res) => {
  const newProduct = new Product({...req.body});
  const result = await newProduct.save();
  res.send(result);
  res.send(`added product successfully, this is what you sent me`);
};

const deleteProduct = async (req, res) => {
  const result = Product.deleteOne({id: req.id});
  res.send(result);
};

module.exports = {

  addProduct,
    getProducts: (req, res) => {
        console.log(req.query);

        // Product.find(req.query)
        //     .then(data => {
        //         res.send({ products: data });
        //     })
        //     .catch(err => res.status(500).send({ error: err }));


        res.send({ res: 'Success' });
    }
  }