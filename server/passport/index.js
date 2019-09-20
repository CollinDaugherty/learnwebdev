const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.query()
    .findOne({ id })
    .then(function(user, err) {
      done(err, user);
    });
});

// Strategies
const RegisterStrategy = require('./RegisterStrategy');
const LoginStrategy = require('./LoginStrategy');

passport.use('local-register', RegisterStrategy);
passport.use('local-login', LoginStrategy);

module.exports = passport;
