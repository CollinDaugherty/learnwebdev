const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const passport = require('../passport');
const isAuthenticated = require('../passport/isAuthenticated');

const Instructor = require('../models/Instructor');

// Get all Instructors
router.get('/instructors', (req, res) => {
  Instructor.query()
    .then(instructors => res.status(200).json(instructors))
    .catch(err => res.status(400).json(err));
});

// Get individual Instructor by ID
router.get('/instructors/:id', (req, res) => {
  const { id } = req.params;

  Instructor.query()
    .where('id', id)
    .then(instructor => res.status(200).json(instructor[0]))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
