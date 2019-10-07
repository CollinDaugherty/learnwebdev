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
router.get('/tutorials', async (req, res) => {
  const list = [];

  const tutorials = await Tutorial.query()
    .eager('[users(defaultSelects), instructors(defaultSelects)]')
    .then(tutorials => tutorials)
    .catch(err => console.log(err));

  for (tutorial of tutorials) {
    let voteCount = await TutorialVote.query()
      .where('tutorial_id', tutorial.id)
      .sum('vote_value')
      .then(data => data[0].sum)
      .catch(err => console.log(err));

    if (voteCount === null) {
      voteCount = 0;
    }

    if (req.user) {
      const user = req.user;
      const userObj = { ...user };
      let voteStatus = await TutorialVote.query()
        .where('tutorial_id', tutorial.id)
        .where('user_id', userObj.id)
        .then(data => data[0].vote_value)
        .catch(err => console.log(err));

      tutorial.voteStatus = voteStatus;
    }

    tutorial.voteCount = voteCount;
    list.push({ ...tutorial });
  }

  //sort list by upvotes
  list.sort(function(a, b) {
    let keyA = new Date(a.voteCount);
    let keyB = new Date(b.voteCount);
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });

  return res.status(200).json(list);
});

// Get single tutorial by ID
router.get('/tutorials/:id', async (req, res) => {
  const { id } = req.params;

  const voteCount = await TutorialVote.query()
    .where('tutorial_id', id)
    .sum('vote_value')
    .then(total => total[0].sum)
    .catch(err => console.log(err));

  Tutorial.query()
    .where('id', id)
    .eager('[users(defaultSelects), instructors(defaultSelects), comments]')
    .then(tutorial => {
      if (tutorial.length) {
        tutorial[0].voteCount = voteCount;
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
  } else {
    finalValue = 0;
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
        vote_value: finalValue
      })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json(err));
  } else {
    await TutorialVote.query()
      .update({ vote_value: finalValue })
      .where('tutorial_id', tutorial_id)
      .where('user_id', user_id)
      .catch(err => console.log(err));
  }
});

module.exports = router;
