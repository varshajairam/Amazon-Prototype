const {
  getCartProducts, addProductToCart, saveForLater, removeProduct, changeProductQuantity,
  applyGiftCharge, updateTotalCost,
} = require('../../actions/cart');

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
      default: break;
    }
  }
}

module.exports = operationsHandler;
