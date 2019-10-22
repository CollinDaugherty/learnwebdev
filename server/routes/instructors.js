const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const passport = require('../passport');
const isAuthenticated = require('../passport/isAuthenticated');
const getTutorialDetails = require('../getTutorialDetails');

const Instructor = require('../models/Instructor');
const Tutorial = require('../models/Tutorial');

// Get all Instructors
router.get('/instructors', (req, res) => {
  Instructor.query()
    .then(instructors => res.status(200).json(instructors))
    .catch(err => res.status(400).json(err));
});

// Get individual Instructor by ID
router.get('/profile/instructors/:id', async (req, res) => {
  const { id } = req.params;

  const instructor = await Instructor.query()
    .where('id', id)
    .then(instructor => instructor[0])
    .catch(err => res.status(400).json(err));

  if (instructor) {
    const tutorials = await Tutorial.query()
      .where('instructor_id', id)
      .eager('[users(defaultSelects), instructors(defaultSelects)]')
      .then(tutorials => tutorials)
      .catch(err => res.status(400).json(err));

    const list = await getTutorialDetails(req, tutorials);

    //sort list by upvotes
    list.sort(function(a, b) {
      let keyA = new Date(a.voteCount);
      let keyB = new Date(b.voteCount);
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });

    if (list) {
      instructor.tutorials = list;
    }

    return res.status(200).json(instructor);
  }
});

module.exports = router;
