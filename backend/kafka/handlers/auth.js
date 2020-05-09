const {
  logoutHandler, registerHandler, isLoggedIn,
} = require('../../actions/auth');

function authHandler(resQueue, data) {
  const key = data.key.toString();
  const message = JSON.parse(data.value.toString());
  if (resQueue.has(key)) {
    const args = resQueue.take(key)();
    switch (message.route) {
      case 'logged_in': isLoggedIn(...args); break;
      case 'register': registerHandler(...args); break;
      case 'logout': logoutHandler(...args); break;
      default: break;
    }
  }
}

module.exports = authHandler;
