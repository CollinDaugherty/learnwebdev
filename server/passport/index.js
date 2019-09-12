const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Strategies
const RegisterStrategy = require('./RegisterStrategy');
const LoginStrategy = require('./LoginStrategy');

passport.use('local-register', RegisterStrategy);
passport.use('local-login', LoginStrategy);

module.exports = passport;
