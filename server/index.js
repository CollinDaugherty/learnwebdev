if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const knex = require('./db/knex');
const passport = require('./passport');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// gets user from session
app.get('/api/user_session', function(req, res) {
  if (req.user === undefined) {
    // user is not logged in
    res.json();
  } else {
    delete req.user.password;
    req.user.isAuthenticated = true;
    res.json(req.user);
  }
});

app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/tutorials'));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`App is listening on port ${port}`);
