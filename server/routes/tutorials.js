const express = require('express');
const router = express.Router();

const { raw } = require('objection');

const uuidv4 = require('uuid/v4');
const passport = require('../passport');
const isAuthenticated = require('../passport/isAuthenticated');
const getTutorialDetails = require('../getTutorialDetails');

const User = require('../models/User');
const Instructor = require('../models/Instructor');
const Tutorial = require('../models/Tutorial');
const TutorialVote = require('../models/TutorialVote');
const Comment = require('../models/Comment');
const Favorite = require('../models/Favorite');

// Submit Tutorial
router.post('/tutorials', isAuthenticated, async (req, res) => {
  const {
    id,
    title,
    url,
    instructorName,
    categories,
    cost,
    medium,
    difficulty,
    user,
    date
  } = req.body;

  // inserts row in tutorials table
  const tutorial = await Tutorial.query()
    .insert({
      id: id,
      title: title,
      url: url,
      categories: `{${categories}}`,
      cost: cost,
      medium: medium,
      difficulty: difficulty,
      date: date,
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

  await TutorialVote.query()
    .insert({
      id: uuidv4(),
      tutorial_id: tutorial.id,
      user_id: tutorial.user_id,
      vote_value: 1
    })
    .catch(err => console.log(err));
});

// List of tutorials
router.get('/tutorials', async (req, res) => {
  const tutorials = await Tutorial.query()
    .eager('[users(defaultSelects), instructors(defaultSelects)]')
    .then(tutorials => tutorials)
    .catch(err => console.log(err));

  const list = await getTutorialDetails(req, tutorials);

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

  let voteCount = await TutorialVote.query()
    .where('tutorial_id', id)
    .sum('vote_value')
    .then(total => total[0].sum)
    .catch(err => console.log(err));

  const tutorial = await Tutorial.query()
    .where('id', id)
    .eager('[users(defaultSelects), instructors(defaultSelects), comments]')
    .then(tutorial => tutorial[0])
    .catch(err => res.status(400).json('error getting tutorial'));

  const commentCount = await Comment.query()
    .where('tutorial_id', id)
    .count('id')
    .catch(err => console.log(err));

  tutorial.commentCount = Number(commentCount[0].count);

  for (comment of tutorial.comments) {
    let commentUsername = await User.query()
      .where('id', comment.user_id)
      .then(comment => comment[0].name)
      .catch(err => console.log(err));

    let index = tutorial.comments.indexOf(comment);

    tutorial.comments[index].username = commentUsername;
  }

  if (tutorial.id) {
    tutorial.voteCount = voteCount;
  }

  if (req.user) {
    let voteStatus = await TutorialVote.query()
      .where('tutorial_id', tutorial.id)
      .where('user_id', req.user.id)
      .then(data => data[0].vote_value)
      .catch(err => console.log(err));

    tutorial.voteStatus = voteStatus;

    const doesFavoriteExist = await Favorite.query()
      .where('tutorial_id', tutorial.id)
      .where('user_id', req.user.id)
      .then(favorite => favorite)
      .catch(err => console.log(err));

    if (doesFavoriteExist.length) {
      tutorial.favorited = true;
    }
  } else {
    tutorial.favorited = false;
  }

  return res.status(200).json(tutorial);
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

// Upvotes - Downvotes
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

// Comment Submission
router.post('/tutorials/:id/comments', (req, res) => {
  const { id, user_id, tutorial_id, body, date } = req.body;

  let comment = Comment.query()
    .insert({
      id: id,
      user_id: user_id,
      tutorial_id: tutorial_id,
      body: body,
      date: date
    })
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(400).json(err));
});

// Add tutorial to Favorites
router.post('/tutorials/:id/favorite', isAuthenticated, async (req, res) => {
  const { user_id, tutorial_id, date } = req.body;

  const doesFavoriteExist = await Favorite.query()
    .findOne({ tutorial_id: tutorial_id, user_id: user_id })
    .catch(err => console.log(err));

  if (!doesFavoriteExist) {
    const favorite = await Favorite.query()
      .insert({
        id: uuidv4(),
        user_id: user_id,
        tutorial_id: tutorial_id,
        date: new Date()
      })
      .then(favorite => res.status(200).json(favorite))
      .catch(err => res.status(400).json(err));
  } else {
    // if Favorite exists, delete it
    await Favorite.query()
      .delete()
      .where('tutorial_id', tutorial_id)
      .where('user_id', user_id);
  }
});

// Get Favorites from current logged in user
router.get('/favorites', isAuthenticated, async (req, res) => {
  const favorites = await Favorite.query()
    .where('user_id', req.user.id)
    .then(favorites => favorites)
    .catch(err => console.log(err));

  const tutorialList = [];
  for (favorite of favorites) {
    const tutorials = await Tutorial.query()
      .where('id', favorite.tutorial_id)
      .eager('[users(defaultSelects), instructors(defaultSelects)]')
      .then(tutorial => tutorialList.push(tutorial[0]))
      .catch(err => res.status(400).json(err));
  }

  const list = await getTutorialDetails(req, tutorialList);

  if (list.length) {
    return res.status(200).json(list);
  }
});

module.exports = router;
