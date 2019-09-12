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
    const name = req.body.name;
    const hash = await bcrypt.hash(password, 10);

    const user = await User.query()
      .findOne({ email: req.body.email })
      .catch(err => console.log(err));

    if (user) {
      return console.log('an account with that email already exists');
    } else {
      User.query()
        .insert({
          id: uuidv4(),
          name: name,
          email: email,
          password: hash,
          joined: new Date()
        })
        .catch(err => res.status(400).json(err));

      done(null, 'user signed up');
    }
  }
);

module.exports = RegisterStrategy;
