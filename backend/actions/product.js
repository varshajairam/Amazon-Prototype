const addProduct = (req, res) => {
    console.log(req.files);
    
  res.send(`added productsuccessfully, this is what you sent me`);
};

module.exports = {
  addProduct,
  getProducts: (req, res) => {
    res.send({ res: 'Success' });
  },
};
