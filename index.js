const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./routes/users');
const team = require('./routes/teams');
const queens = require('./routes/queens');
const seasons = require('./routes/seasons');
const drafts = require('./routes/drafts');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/users', users);
app.use('/api/teams', team);
app.use('/api/queens', queens);
app.use('/api/seasons', seasons);
app.use('/api/drafts', drafts);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`);
});
