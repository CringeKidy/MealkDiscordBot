require('dotenv').config();
require('./strats/discord.js')

// server/index.js
const express = require('express');
const PORT = process.env.PORT || 3001;

const path = require('path');
const routes = require('./routes')

const ConnectionURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@data.3nr62.mongodb.net/Mealk`

const passport = require('passport');
const session = require('express-session');
const cors = require('cors')
const Store  = require('connect-mongo');

const app = express();
app.use(cors({
  origin:[`http://localhost:3000`],
  credentials: true,
}))

app.use(session({
  secret: process.env.SECRET,
  cookie:{
    maxAge: 60000 * 60 * 24
  },
  resave: false,
  saveUninitialized: false,
  store: Store.create({
    mongoUrl: ConnectionURL
})
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.use('/api', routes);

// Handle GET requests to /api route
app.get("/test", (req, res) => {
  res.json({ message: 'yes' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  require('./database/Util/mogodb.js').init()
});
