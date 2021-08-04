require('dotenv').config;
const DiscordStrat = require('passport-discord').Strategy;
const passport = require('passport')

const callbackURL = process.env.callbackURL || 'http://localhost:3001'

passport.use(new DiscordStrat({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_Secret,
    callbackURL: callbackURL + '/api/auth/discord/redirect',
    scope: ['identify', 'guilds', 'email']
},

function(accessToken, refreshToken, profile, done){
    User.findOrCreate({discordId: profile.id}, function(err, user){
        return done(err, user);
    });
}

))