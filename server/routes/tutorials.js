const express = require('express');
const router = express.Router();

const { raw } = require('objection');

const uuidv4 = require('uuid/v4');
const passport = require('../passport');
const isAuthenticated = require('../passport/isAuthenticated');

const User = require('../models/User');
const Instructor = require('../models/Instructor');
const Tutorial = require('../models/Tutorial');
const TutorialVote = require('../models/TutorialVote');

// Submit Tutorial
router.post('/tutorials', isAuthenticated, async (req, res) => {
  const {
    title,
    url,
    instructorName,
    categories,
    cost,
    medium,
    difficulty,
    user
  } = req.body;

  // inserts row in tutorials table
  const tutorial = await Tutorial.query()
    .insert({
      id: uuidv4(),
      title: title,
      url: url,
      categories: `{${categories}}`,
      cost: cost,
      medium: medium,
      difficulty: difficulty,
      posted: new Date(),
      user_id: user,
      instructor_name: instructorName
    })
    .catch(err => console.log(err));

  // check instructors table for existing row
  let instructor = await Instructor.query()
    .findOne({ name: req.body.instructorName })
    .catch(err => console.log(err));

  if (instructor) {
    // if instructor already exists, adds the instructor id to associated row in the tutorials table
    await tutorial
      .$relatedQuery('instructors')
      .relate(instructor)
      .catch(err => console.log(err));
  } else {
    // if instructor doesn't exist, creates a new instructor and adds the instructor id to associated row in the tutorials table
    await tutorial
      .$relatedQuery('instructors')
      .insert({
        id: uuidv4(),
        name: instructorName,
        created: new Date()
      })
      .catch(err => console.log(err));
  }
});

// List of tutorials
router.get('/tutorials', (req, res) => {
  Tutorial.query()
    .eager('[users(defaultSelects), instructors(defaultSelects)]')
    .then(tutorials => {
      res.json(tutorials);
    })
    .catch(err => res.status(400).json(err));
});

// Get single tutorial by ID
router.get('/tutorials/:id', (req, res) => {
  const { id } = req.params;

  Tutorial.query()
    .where('id', id)
    .eager(
      '[users(defaultSelects), instructors(defaultSelects), tutorial_votes, comments]'
    )
    .then(tutorial => {
      if (tutorial.length) {
        res.json(tutorial[0]);
      } else {
        res.status(400).json('tutorial not found');
      }
    })
    .catch(err => res.status(400).json('error getting tutorial'));
});

// Search Tutorials
router.get('/tutorials/search/:searchTerms', (req, res) => {
  const { searchTerms } = req.params;
  Tutorial.query()
    .where(raw('?=ANY(categories)', searchTerms))
    .orWhere(raw('title ILIKE ?', `%${searchTerms}%`))
    .orWhere(raw('instructor_name ILIKE ?', `%${searchTerms}%`))
    .eager('[users(defaultSelects), instructors(defaultSelects)]')
    .then(tutorials => {
      res.json(tutorials);
    })
    .catch(err => res.status(400).json(err));
});

//Upvotes - Downvotes
router.post('/tutorials/vote', async (req, res) => {
  const { tutorial_id, user_id, value } = req.body;

  let finalValue;
  if (value > 0) {
    finalValue = 1;
  } else if (value < 0) {
    finalValue = -1;
  }

  const doesVoteExist = await TutorialVote.query()
    .findOne({ tutorial_id: tutorial_id, user_id: user_id })
    .catch(err => console.log(err));

  if (!doesVoteExist) {
    await TutorialVote.query()
      .insert({
        id: uuidv4(),
        tutorial_id: tutorial_id,
        user_id: user_id,
        vote_value: value
      })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  } else {
    res.json(`Can't vote twice`);
  }
});

module.exports = router;
