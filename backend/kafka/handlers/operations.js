const { getCategories, addCategory, deleteCategory } = require('../../actions/category');
const { getOrders, placeOrder, updateOrder } = require('../../actions/order');
const { moveToCart, removeSavedProduct, getProducts: getSavedProducts } = require('../../actions/saveForLater');
const { getSellers } = require('../../actions/users');

function operationsHandler(resQueue, data) {
  const key = data.key.toString();
  const message = JSON.parse(data.value.toString());
  if (resQueue.has(key)) {
    const args = resQueue.take(key)();
    switch (message.route) {
      case 'post/': addCategory(...args); break;
      case 'get/': getCategories(...args); break;
      case 'delete/': deleteCategory(...args); break;
      case 'getOrder': getOrders(...args); break;
      case 'postOrder': placeOrder(...args); break;
      case 'putOrder': updateOrder(...args); break;
      case 'moveToCart': moveToCart(...args); break;
      case 'removeProductSave': removeSavedProduct(...args); break;
      case 'getProductsSave': getSavedProducts(...args); break;
      case 'getSellers': getSellers(...args); break;
      default: break;
    }
  }
}

module.exports = operationsHandler;
