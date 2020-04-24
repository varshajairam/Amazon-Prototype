const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const {
  loginHandler, serializeUser, deserializeUser, logoutHandler, registerHandler, isLoggedIn,
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

app.post('/logged_in', isLoggedIn);

app.get('/logout', logoutHandler);

app.post('/register', registerHandler);

module.exports = app;
