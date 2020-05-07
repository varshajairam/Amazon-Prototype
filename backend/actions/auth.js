const bcrypt = require('bcrypt');
const { User } = require('../models/index');

function loginHandler(req, username, password, done) {
  User.findOne({
    where: {
      email: username,
    },
  }).then((user) => {
    if (!user) done(null, false, { message: 'Incorrect username or password.' });
    else {
      bcrypt.compare(password, user.dataValues.password).then((result) => {
        if (result) done(null, user.dataValues);
        else done(null, false, { message: 'Incorrect username or password.' });
      });
    }
  });
}

function serializeUser(user, done) {
  done(null, user.id);
}

function deserializeUser(id, done) {
  User.findByPk(id).then((user) => {
    done(null, user.dataValues);
  });
}

function logoutHandler(req, res) {
  req.logout();
  res.send({ res: 'Success' });
}

function registerHandler(req, res) {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      ...req.body,
      password: hash,
    }).then(() => {
      res.send({ res: 'Success' });
    }, () => {
      res.status(400).send({ res: 'Failed' });
    });
  });
}

function isLoggedIn(req, res) {
  res.send({ logged_in: !!req.user, user_type: req.user ? req.user.type : null });
}

module.exports = {
  loginHandler, serializeUser, deserializeUser, logoutHandler, registerHandler, isLoggedIn,
};
