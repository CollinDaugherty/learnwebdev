const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');
const knex = require('./db/knex');
const uuidv4 = require('uuid/v4');

const { raw } = require('objection');

const User = require('./models/User');
const Instructor = require('./models/Instructor');
const Tutorial = require('./models/Tutorial');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));

// Get single user
app.get('/api/user/:id', (req, res) => {
  const { id } = req.params;
  User.query()
    .select('id', 'name', 'joined', 'avatar')
    .where('id', id)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(400).json('error getting user'));
});

app.post('/api/login', (req, res) => {
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

app.post('/api/register', (req, res) => {
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

app.post('/api/tutorials', async (req, res) => {
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

  let instructor = await Instructor.query()
    .findOne({ name: req.body.instructorName })
    .catch(err => console.log(err));

  if (instructor) {
    await tutorial
      .$relatedQuery('instructors')
      .relate(instructor)
      .catch(err => console.log(err));
  } else {
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
app.get('/api/tutorials', (req, res) => {
  Tutorial.query()
    .eager('[users(defaultSelects), instructors(defaultSelects)]')
    .then(tutorials => {
      res.json(tutorials);
    })
    .catch(err => res.status(400).json(err));
});

// Get single tutorial by ID
app.get('/api/tutorials/:id', (req, res) => {
  const { id } = req.params;
  Tutorial.query()
    .where('id', id)
    .eager('[users(defaultSelects), instructors(defaultSelects), comments]')
    .then(tutorial => {
      if (tutorial.length) {
        res.json(tutorial[0]);
      } else {
        res.status(400).json('tutorial not found');
      }
    })
    .catch(err => res.status(400).json('error getting tutorial'));
});

app.get('/api/tutorials/search/:searchTerms', (req, res) => {
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

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
