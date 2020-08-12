const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./routes/users');
const groups = require('./routes/groups');
const queens = require('./routes/queens');
const seasons = require('./routes/seasons');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/users', users);
app.use('/api/groups', groups);
app.use('/api/queens', queens);
app.use('/api/seasons', seasons);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`);
});
