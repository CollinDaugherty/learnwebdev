const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');
const knex = require('knex');
const uuidv4 = require('uuid/v4');

const User = require('./models/User');
const Tutorial = require('./models/Tutorial');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));

// Get single user
app.get('/api/user/:id', (req, res) => {
  const { id } = req.params;
  User.query()
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

app.post('/api/tutorials', (req, res) => {
  const {
    title,
    url,
    categories,
    cost,
    medium,
    difficulty,
    submittedBy
  } = req.body;

  Tutorial.query()
    .insert({
      title: title,
      url: url,
      cost: cost,
      medium: medium,
      difficulty: difficulty,
      user_id: submittedBy
    })
    .catch(err => res.status(400).json(err));
});

// List of tutorials
app.get('/api/tutorials', (req, res) => {
  Tutorial.query()
    .select()
    .then(tutorials => {
      res.json(tutorials);
    })
    .catch(err => res.status(400).json('error getting tutorials'));
});

// Get single tutorial
app.get('/api/tutorials/:id', (req, res) => {
  const { id } = req.params;
  Tutorial.query()
    .where('id', id)
    .then(tutorial => {
      if (tutorial.length) {
        res.json(tutorial[0]);
      } else {
        res.status(400).json('tutorial not found');
      }
    })
    .catch(err => res.status(400).json('error getting tutorial'));
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
