const { Product } = require('../models/index');

module.exports = {

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