const { User, userAddress } = require('../models/index');

function getProfile(req, res) {
  const email = req.body && req.body.email ? req.body.email : req.user.email;
  User.findOne({
    where: { email },
    attributes: ['name', 'email', 'profile_image', 'type'],
    include: userAddress,
  }).then((user) => {
    if (!user.profile_image) user.profile_image = `${process.env.SERVER_ROOT}/images/default_profile_image.jpg`;
    res.send(user);
  });
}

function addProfileImage(req, res) {
  const path = req.files[0].location;
  User.update({
    profile_image: path,
  }, { where: { id: req.user.id } }).then(() => {
    res.send(path);
  });
}

function editProfile(req, res) {
  User.update({ ...req.body }, { where: { id: req.user.id } }).then(() => {
    res.send(req.body);
  });
}

function addAddress(req, res) {
  userAddress.create({ ...req.body, userId: req.user.id }).then((address) => {
    res.send(address);
  });
}

function deleteAddress(req, res) {
  userAddress.destroy({ where: { id: req.body.addressId } }).then(() => {
    res.send(req.body.addressId);
  });
}

module.exports = {
  getProfile, addProfileImage, editProfile, addAddress, deleteAddress,
};
