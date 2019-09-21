const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const passport = require('../passport');
const isAuthenticated = require('../passport/isAuthenticated');

const User = require('../models/User');

router.post('/register', (req, res, next) => {
  passport.authenticate('local-register', function(error, user, info) {
    if (error) {
      return res.status(400).json(error);
    }

    req.logIn(user, error => {
      if (error) {
        return res.status(400).json(error);
      } else {
        return res.status(200).json(user);
      }
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local-login', function(error, user, info) {
    if (error) {
      return res.status(400).json(error);
    }

    req.logIn(user, error => {
      if (error) {
        return res.status(400).json(error);
      } else {
        user.isAuthenticated = true;
        return res.status(200).json(user);
      }
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.json();
});

// Get single user
router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  User.query()
    .select('id', 'name', 'joined', 'avatar')
    .where('id', id)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(400).json('error getting user'));
});

module.exports = router;
