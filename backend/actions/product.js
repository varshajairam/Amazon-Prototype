const { Product } = require('../models/index');

const addProduct = (req, res) => {
    console.log(req.files);
    
  res.send(`added productsuccessfully, this is what you sent me`);
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