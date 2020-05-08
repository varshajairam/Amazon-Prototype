const {
  getCartProducts, addProductToCart, saveForLater, removeProduct, changeProductQuantity,
  applyGiftCharge, updateTotalCost,
} = require('../../actions/cart');
const { getCategories, addCategory, deleteCategory } = require('../../actions/category');
const { getOrders, placeOrder, updateOrder } = require('../../actions/order');
const {
  getProducts, getProduct, addProduct, addReview, deleteProduct, updateProduct, getRecomendations,
  addView,
} = require('../../actions/product');
const { moveToCart, removeSavedProduct, getProducts: getSavedProducts } = require('../../actions/saveForLater');
const { getSellers } = require('../../actions/users');

function operationsHandler(resQueue, data) {
  const key = data.key.toString();
  const message = JSON.parse(data.value.toString());
  if (resQueue.has(key)) {
    const args = resQueue.take(key)();
    switch (message.route) {
      case 'addToCart': addProductToCart(...args); break;
      case 'removeProduct': removeProduct(...args); break;
      case 'changeProductQuantity': changeProductQuantity(...args); break;
      case 'getCartProducts': getCartProducts(...args); break;
      case 'saveForLater': saveForLater(...args); break;
      case 'applyGiftCharge': applyGiftCharge(...args); break;
      case 'updateTotalCost': updateTotalCost(...args); break;
      case 'post/': addCategory(...args); break;
      case 'get/': getCategories(...args); break;
      case 'delete/': deleteCategory(...args); break;
      case 'getOrder': getOrders(...args); break;
      case 'postOrder': placeOrder(...args); break;
      case 'putOrder': updateOrder(...args); break;
      case 'getProducts': getProducts(...args); break;
      case 'addProduct': addProduct(...args); break;
      case 'updateProduct': updateProduct(...args); break;
      case 'addView': addView(...args); break;
      case 'deleteProduct': deleteProduct(...args); break;
      case 'recomendations': getRecomendations(...args); break;
      case 'addReview': addReview(...args); break;
      case 'single': getProduct(...args); break;
      case 'moveToCart': moveToCart(...args); break;
      case 'removeProductSave': removeSavedProduct(...args); break;
      case 'getProductsSave': getSavedProducts(...args); break;
      case 'getSellers': getSellers(...args); break;
      default: break;
    }
  }
}

module.exports = operationsHandler;
