const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/users', users);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`);
});
