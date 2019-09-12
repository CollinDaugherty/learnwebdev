if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const knex = require('./db/knex');
const passport = require('./passport');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(passport.initialize());
//app.use(passport.session());

app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/tutorials'));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`App is listening on port ${port}`);
