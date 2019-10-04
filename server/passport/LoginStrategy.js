const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/User');

const LoginStrategy = new LocalStrategy(
  {
    passReqToCallback: true,
    usernameField: 'email'
  },
  async function(req, email, password, done) {
    try {
      const [user] = await User.query().where('email', '=', req.body.email);
      if (user === null) throw new Error('Incorrect email or password');

      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) throw new Error('Incorrect email or password');

      delete user.password;
      done(null, user);
    } catch (err) {
      done('Incorrect email or password');
    }
  }
);

module.exports = LoginStrategy;
