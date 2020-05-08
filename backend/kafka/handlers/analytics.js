const {
  getTopFiveSoldProducts, getTopTenProductsViewed, getNoOfOrders, getTopTenProductsBasedOnRatings,
  getTopTenCustomersBasedOnPurchaseAmount,
} = require('../../actions/analytics');

function authHandler(resQueue, data) {
  const key = data.key.toString();
  const message = JSON.parse(data.value.toString());
  if (resQueue.has(key)) {
    const args = resQueue.take(key)();
    switch (message.route) {
      case 'getTopFiveSoldProducts': getTopFiveSoldProducts(...args); break;
      case 'getTopTenProductsViewed': getTopTenProductsViewed(...args); break;
      case 'getNoOfOrders': getNoOfOrders(...args); break;
      case 'getTopTenProductsBasedOnRatings': getTopTenProductsBasedOnRatings(...args); break;
      case 'getTopTenCustomersBasedOnPurchaseAmount': getTopTenCustomersBasedOnPurchaseAmount(...args); break;
      default: break;
    }
  }
}

module.exports = authHandler;
