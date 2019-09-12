const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

const User = require('../models/User');

const LoginStrategy = new LocalStrategy(
  {
    passReqToCallback: true,
    usernameField: 'email'
  },
  async function(req, email, password, done) {
    const user = await User.query()
      .where('email', '=', req.body.email)
      .then(async user => {
        const isValid = await bcrypt.compare(
          req.body.password,
          user[0].password
        );
        if (isValid) {
          delete user[0].password;
          return user[0];
        } else {
          return done('Incorrect email or password', null);
        }
      })
      .catch(err => {
        let error = err;
      });

    done(null, user);
  }
);

module.exports = LoginStrategy;
