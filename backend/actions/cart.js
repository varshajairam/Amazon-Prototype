const { Cart } = require('../models/index');
const { SavedForLater } = require('../models/index');
const { Product } = require('../models/index');

const getProductDetail = async (req, model) => {
  const result = await model.findOne();

  if (result) {
    const customerCart = result.items.find((item) => item.customer === req.user.id);
    if (customerCart) {
      const products = [];
      for (const item of customerCart.products) {
        const product = await Product.findOne({ _id: item.product });
        products.push({ product, quantity: item.quantity, cost: item.cost, totalCost: customerCart.totalCost, isGift: item.isGift });
      }
      return products;
    }
  } else {
    return 'Cart empty';
  }
};

const getCartProducts = async (req, res) => {
  const products = await getProductDetail(req, Cart);
  res.send(products);
};

const addProductToCart = async (req, res) => {
  const result = await Cart.findOne();
  const fullProduct = await Product.findOne({ _id: req.body.product });
  req.body.cost = (fullProduct.baseCost * req.body.quantity) + fullProduct.addonCost;
  if (JSON.parse(req.body.isGift)) {
    req.body.cost += 1.0;
  }
  if (result) {
    const customerCart = result.items.find((item) => item.customer === req.user.id);
    if (customerCart) {
      const index = customerCart.products.findIndex((product) => product.product == req.body.product);
      customerCart.totalCost += req.body.cost;
      customerCart.totalCost = Number(customerCart.totalCost.toFixed(2));
      if (index > -1) {
        customerCart.products[index].quantity = Number(customerCart.products[index].quantity) + Number(req.body.quantity);
        await result.save();
        res.status(500).send(`Item is already added to cart. Quantity has been updated to ${customerCart.products[index].quantity}`);
      } else {
        customerCart.products.unshift(req.body);
        const response = await result.save();
        res.send(response);
      }
    }
  } else {
    const cart = new Cart({
      items: [{
        products: [req.body],
        customer: req.user.id,
        totalCost: req.body.cost,
      }],
    });
    const response = await cart.save();
    res.send(response);
  }
};

const removeProductFromCart = async (product, args) => {
  const cart = await Cart.findOne(
    { 'items.customer': args.req.user.id },
  );
  const index = cart.items[0].products.findIndex((item) => item.product == product);
  if (index > -1) {
    cart.items[0].totalCost -= cart.items[0].products[index].cost;
    cart.items[0].totalCost = Number(cart.items[0].totalCost.toFixed(2));
    cart.items[0].products.splice(index, 1);
    await cart.save();
  }

  const cartResponse = await getProductDetail(args.req, Cart);
  return cartResponse;
};

const saveForLater = async (req, res) => {
  const result = await SavedForLater.findOne();
  let response;

  if (result) {
    const customerSaved = result.items.find((item) => item.customer === req.user.id);
    if (customerSaved) {
      customerSaved.products.unshift(req.body);
      await result.save();
      response = await getProductDetail(req, SavedForLater);
    }
  } else {
    const saved = new SavedForLater({
      items: [{
        products: [req.body],
        customer: req.user.id,
      }],
    });
    await saved.save();
    response = await getProductDetail(req, SavedForLater);
  }

  const cartResponse = await removeProductFromCart(req.body.product, { req, res });

  res.send({ response, cartResponse });
};

const removeProduct = async (req, res) => {
  const result = await removeProductFromCart(req.body.product, { req, res });
  res.send(result);
};

const changeProductQuantity = async (req, res) => {
  const cart = await Cart.findOne(
    { 'items.customer': req.user.id },
  );

  const index = cart.items[0].products.findIndex((item) => item.product == req.body.product);
  if (index > -1) {
    cart.items[0].totalCost -= cart.items[0].products[index].cost;
    cart.items[0].products[index].quantity = req.body.quantity;
    const fullProduct = await Product.findOne({ _id: req.body.product });
    cart.items[0].products[index].cost = (fullProduct.baseCost * req.body.quantity) + fullProduct.addonCost;
    cart.items[0].totalCost += cart.items[0].products[index].cost;
    cart.items[0].totalCost = Number(cart.items[0].totalCost.toFixed(2));
    await cart.save();
  }

  const cartResponse = await getProductDetail(req, Cart);
  res.send(cartResponse);
};

const applyGiftCharge = async (req, res) => {
  const cart = await Cart.findOne(
    { 'items.customer': req.user.id },
  );

  const index = cart.items[0].products.findIndex((item) => item.product == req.body.product);
  if (index > -1) {
    cart.items[0].totalCost -= cart.items[0].products[index].cost;
    cart.items[0].products[index].isGift = JSON.parse(req.body.isGift);
    cart.items[0].products[index].cost = JSON.parse(req.body.isGift) ? (cart.items[0].products[index].cost + cart.items[0].giftCharge) : (cart.items[0].products[index].cost - cart.items[0].giftCharge);
    cart.items[0].totalCost += cart.items[0].products[index].cost;
    await cart.save();
  }

  const cartResponse = await getProductDetail(req, Cart);
  res.send(cartResponse);
}

module.exports = {
  addProductToCart,
  removeProduct,
  changeProductQuantity,
  getCartProducts,
  saveForLater,
  applyGiftCharge,
};
