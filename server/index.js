require('dotenv').config();
require('./strats/discord.js')

// server/index.js
const express = require('express');
const PORT = process.env.PORT || 8080;

const path = require('path');
const routes = require('./routes')

const mongodb = require('./database/Util/mogodb.js')
const ConnectionURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@data.3nr62.mongodb.net/Mealk`

const passport = require('passport');
const session = require('express-session');
const cors = require('cors')
const Store  = require('connect-mongo');

const app = express();


mongodb.init();


/* // Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build'))); */  

app.use(cors({
  origin:['http://localhost:3000','http://localhost:8080'],
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

app.use('/api', routes);

// Handle GET requests to /api route
app.get("/test", (req, res) => {
  res.json({ message: 'yes' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
