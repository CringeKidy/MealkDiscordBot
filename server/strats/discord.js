const passport = require('passport');
const DiscordStrat = require('passport-discord');
const User = require('../database/schemas/user.js');

passport.serializeUser((user, done) => {
  done(null, user.discordId)
});

passport.deserializeUser(async (discordId, done) => {
  try{
    const user = await User.findOne({discordId});
    return user ? done(null, user) : done(null, null)
  }
  catch(err){
    done(err, null)
  }
});

passport.use(new DiscordStrat({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.URL}:8080/api/auth/discord/redirect`,
    scope: ['identify', 'email', 'guilds'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try{
      const {id, username, discriminator, avatar, guilds} = profile
    
    const findUser = await User.findOneAndUpdate({discordId: id}, {
      discordTag: `${username}#${discriminator}`,
      avatar,
      guilds,
    }, {new: true})

    if(findUser){
      console.log('User')
      return done(null, findUser)
    }
    else{
      const newUser = await User.create({
        discordId:id,
        discordTag: `${username}#${discriminator}`,
        avatar,
        guilds
      })
      return done(null, newUser)
    }
    }
    catch(err){
      console.log(err);
      return done(err, null)
    }
  }
))
