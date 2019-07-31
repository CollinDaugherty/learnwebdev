const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const path = require('path');
const knex = require('knex');

const User = require('./models/User');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('/api/user/:id', (req, res) => {
  const { id } = req.params;
  User.query()
    .where('id', id)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(400).json('error getting user'));
});

// app.post('/api/login', (req, res) => {
//   db.select('email', 'hash')
//     .from('login')
//     .where('email', '=', req.body.email)
//     .then(data => {
//       const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
//       if (isValid) {
//         return db
//           .select('*')
//           .from('users')
//           .where('email', '=', req.body.email)
//           .then(user => {
//             res.json(user[0]);
//           })
//           .catch(err => res.status(400).json('unable to get user'));
//       } else {
//         res.status(400).json('wrong credentials');
//       }
//     })
//     .catch(err => res.status(400).json('wrong credentials'));
// });

// app.post('/api/register', (req, res) => {
//   const { name, email, password } = req.body;
//   const hash = bcrypt.hashSync(password);
// });

// app.post('/api/tutorials', (req, res) => {
//   const {
//     title,
//     url,
//     categories,
//     cost,
//     medium,
//     difficulty,
//     submittedBy
//   } = req.body;
// });

// app.get('/api/tutorials', (req, res) => {
//   db.select('*')
//     .from('tutorials')
//     .then(tutorials => {
//       res.json(tutorials);
//     });
// });

// app.get('/api/tutorials/:id', (req, res) => {
//   const { id } = req.params;
//   db.select('*')
//     .from('tutorials')
//     .where({ id })
//     .then(post => {
//       if (post.length) {
//         res.json(post[0]);
//       } else {
//         res.status(400).json('not found');
//       }
//     })
//     .catch(err => res.status(400).json('error getting tutorial'));
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
