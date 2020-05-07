const { Product, Review, Order } = require('../models/index');

const getTopFiveSoldProducts = async (req, res) => {
    // if(req.user && req.user.type === 'Admin'){
  const result = await Order.aggregate([
    { $match: { "status": {$ne: "Cancelled"} } },
    // { $project: {products: {product:{_id: "$products.product._id", quantity: "$products.quantity"} }}},
    { $project: {products: "$products"}},
    { $project: {products: "$products"}},
    
    { $unwind: "$products"},
    { $group: {_id: "$products.product._id", quantity: {$sum: "$products.quantity"}} },
    // { $unwind: "$products.product"},
    // { $unwind: "$products.product._id"},
    // { $unwind: "$products.product.quantity"},
    // { $group: {_id: "$products.product"}}
    // {
    //   $group: {
    //     _id: '$category',
    //     products: {
    //       $push: {
    //         _id: '$_id',
    //         images: '$images',
    //         addonCost: '$addonCost',
    //         offers: '$offers',
    //         name: '$name',
    //         baseCost: '$baseCost',
    //         category: '$category',
    //         description: '$description',
    //         seller: '$seller',
    //         averageRating: '$averageRating',
    //         reviews: '$reviews',
    //       },
    //     },
    //   },
    // },
    // { $project: { products: { $slice: ['$products', 5] } } }
  ]);
  await Product.populate(result, { path: "_id" });
  console.log(result);
  
  return res.send(result);
// }
    // res.status(401).send("Unauthorized");
};

module.exports = {getTopFiveSoldProducts}