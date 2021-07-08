//Namespace Stuff
const Discord = require('discord.js')
const bot = new Discord.Client
const config = require('./Jsons/config.json');

//when the bot is online makeing sure that there is a database called USERS.sqlite and saying that it is online in the console
bot.on("ready", () => {
  console.log(`logged in as ${bot.user.tag}`)

})


//log in for the bot
bot.login(config.token);