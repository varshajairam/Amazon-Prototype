const {
  getProducts, getProduct, addProduct, addReview, deleteProduct, updateProduct, getRecomendations,
  addView,
} = require('../../actions/product');

function operationsHandler(resQueue, data) {
  const key = data.key.toString();
  const message = JSON.parse(data.value.toString());
  if (resQueue.has(key)) {
    const args = resQueue.take(key)();
    switch (message.route) {
      case 'getProducts': getProducts(...args); break;
      case 'addProduct': addProduct(...args); break;
      case 'updateProduct': updateProduct(...args); break;
      case 'addView': addView(...args); break;
      case 'deleteProduct': deleteProduct(...args); break;
      case 'recomendations': getRecomendations(...args); break;
      case 'addReview': addReview(...args); break;
      case 'single': getProduct(...args); break;
      default: break;
    }
  }
}

module.exports = operationsHandler;
