require('dotenv').config();

// server/index.js
const express = require('express');
const PORT = process.env.PORT || 3001;
const path = require('path');

const routes = require('./routes');

const cors = require('cors');

const app = express();

app.use(cors())

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.use('/api', routes)


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  require('./database/Util/mogodb.js').init()
});
