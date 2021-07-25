require('dotenv').config();
require('./strats/discord.js')

// server/index.js
const express = require('express');
const PORT = process.env.PORT || 8080;

const path = require('path');
const routes = require('./routes')

const mongodb = require('./database/Util/mogodb.js');
const passport = require('passport');
const DiscordStrat = require('passport-discord').Strategy;

const app = express();
mongodb.init();


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

/* // Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build'))); */

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: `${AdminRole}` });
});

