const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const knex = require('./db/knex');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/', require('./routes/users'));
app.use('/', require('./routes/tutorials'));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
