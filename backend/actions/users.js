const { User } = require('../models/index');

const getSellers = (req, res) => {
  User.findAll({
    where: { type: 'Seller' },
    attributes: ['id', 'name', 'email', 'profile_image']
  }).then((user) => {
    res.send(user);
  });
}

module.exports = {
  getSellers
};