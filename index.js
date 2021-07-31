require('dotenv').config();

// server/index.js
const express = require('express');
const PORT = process.env.PORT || 3001;
const path = require('path');

const cors = require('cors');

const app = express();

app.use(cors({
  origin:['http://192.168.1.6:3000', 'http://localhost:3000', 'https://mealkdashboard.netlify.app']
}))


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.use('/api', (req, res) => {
  res.send({msg:"yes"})
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  require('./database/Util/mogodb.js').init()
});
