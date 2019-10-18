const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const passport = require('../passport');
const isAuthenticated = require('../passport/isAuthenticated');

const User = require('../models/User');
const Instructor = require('../models/Instructor');
const Tutorial = require('../models/Tutorial');
const TutorialVote = require('../models/TutorialVote');
const Comment = require('../models/Comment');
const Favorite = require('../models/Favorite');

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
  req.session.destroy();
  req.logout();
  res.json('user logged out');
});

// Get single user
router.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  const list = [];
  const reqUser = req.user;
  const userObj = { ...reqUser };

  const user = await User.query()
    .select('id', 'name', 'joined', 'avatar')
    .where('id', id)
    .then(user => user[0])
    .catch(err => res.status(400).json(err));

  const tutorials = await Tutorial.query()
    .where('user_id', id)
    .then(tutorials => tutorials)
    .catch(err => res.status(400).json(err));

  for (tutorial of tutorials) {
    if (req.user) {
      const doesFavoriteExist = await Favorite.query()
        .where('tutorial_id', tutorial.id)
        .where('user_id', userObj.id)
        .then(favorite => favorite)
        .catch(err => console.log(err));

      if (doesFavoriteExist.length) {
        tutorial.favorited = true;
      }
    } else {
      tutorial.favorited = false;
    }

    const commentCount = await Comment.query()
      .where('tutorial_id', tutorial.id)
      .count('id')
      .catch(err => console.log(err));

    tutorial.commentCount = Number(commentCount[0].count);

    let voteCount = await TutorialVote.query()
      .where('tutorial_id', tutorial.id)
      .sum('vote_value')
      .then(data => data[0].sum)
      .catch(err => console.log(err));

    if (voteCount === null) {
      voteCount = 0;
    }

    if (req.user) {
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

  if (list) {
    user.tutorials = list;
  }

  if (user.id) {
    return res.status(200).json(user);
  }
});

module.exports = router;
