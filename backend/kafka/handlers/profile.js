const {
  getProfile, addProfileImage, editProfile, addAddress, deleteAddress, addCard, deleteCard,
  getComments,
} = require('../../actions/profile');

function authHandler(resQueue, data) {
  const key = data.key.toString();
  const message = JSON.parse(data.value.toString());
  if (resQueue.has(key)) {
    const args = resQueue.take(key)();
    switch (message.route) {
      case 'get_profile': getProfile(...args); break;
      case 'add_profile_image': addProfileImage(...args); break;
      case 'edit_profile': editProfile(...args); break;
      case 'add_address': addAddress(...args); break;
      case 'delete_address': deleteAddress(...args); break;
      case 'add_card': addCard(...args); break;
      case 'delete_card': deleteCard(...args); break;
      case 'get_comments': getComments(...args); break;
      default: break;
    }
  }
}

module.exports = authHandler;
