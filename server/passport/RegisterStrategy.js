const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

const User = require('../models/User');

const RegisterStrategy = new LocalStrategy(
  {
    passReqToCallback: true,
    usernameField: 'email'
  },
  async function(req, email, password, done) {
    try {
      const name = req.body.name;
      const hash = await bcrypt.hash(password, 10);

      const checkUser = await User.query()
        .findOne({ email: req.body.email })
        .catch(err => console.log(err));

      if (checkUser) {
        return done('Email already in use', null);
      } else {
        const user = await User.query().insert({
          id: uuidv4(),
          name: name,
          email: email,
          password: hash,
          joined: new Date()
        });
        done(null, user);
      }
    } catch (err) {
      done(err.message);
    }
  }
);

module.exports = RegisterStrategy;
