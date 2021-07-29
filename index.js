require('dotenv').config();

// server/index.js
const express = require('express');
const PORT = process.env.PORT || 3001;

const cors = require('cors');

const app = express();

app.use(cors({
  origin:'http://localhost:3000'
}))

app.get('/api', (req, res) => {
  res.send({msg:"yes"})
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  require('./database/Util/mogodb.js').init()
});
