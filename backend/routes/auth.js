const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const kafka = require('../kafka');

const app = express();
const {
  loginHandler, serializeUser, deserializeUser,
} = require('../actions/auth');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
}, loginHandler));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send({ user_type: req.user.type });
});

app.post('/logged_in', (...args) => kafka.sendMessage('auth', { route: 'logged_in' }, args));

app.get('/logout', (...args) => kafka.sendMessage('auth', { route: 'logout' }, args));

app.post('/register', (...args) => kafka.sendMessage('auth', { route: 'register' }, args));

module.exports = app;
