const productActions = require('../../actions/product');

function productHandler(resQueue, data) {
console.log("in product handler");

  const key = data.key.toString();
  const message = JSON.parse(data.value.toString());
  if (resQueue.has(key)) {
	const args = resQueue.take(key)();
	console.log('inhandler', message.route);
    switch (message.route) {

		
      case 'get_products': productActions.getProducts(...args); break;
      default: break;
    }
  }
}

module.exports = productHandler;
