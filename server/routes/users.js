const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

const User = require('../models/User');

router.post('/api/login', (req, res) => {
  User.query()
    .where('email', '=', req.body.email)
    .then(user => {
      const isValid = bcrypt.compareSync(req.body.password, user[0].password);
      if (isValid) {
        res.json(user[0]);
      } else {
        res.status(400).json('wrong credentials');
      }
    })
    .catch(err => res.status(400).json(err));
});

router.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  User.query()
    .insert({
      id: uuidv4(),
      name: name,
      email: email,
      password: hash,
      joined: new Date()
    })
    .catch(err => res.status(400).json(err));
});

// Get single user
router.get('/api/user/:id', (req, res) => {
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
