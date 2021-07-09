//Namespace Stuff
const Discord = require('discord.js')
const fs = require('fs')

const bot = new Discord.Client
const config = require('./Jsons/config.json');
const ServerConfig = require("./Schema/Serverconfig.js");
const message = require('./events/message');

bot.mongoose = require('./Util/mogodb.js')
bot.config = config;

fs.readdir('./events/', (err, files) => {
  if(err) return console.error(err);
  files.forEach(file =>{
    // If a file is not ending with JS we ignore the file
    if(!file.endsWith('js')) return;

    // Load all the files in event folder
    const event = require(`./events/${file}`);
    
    // Just getting the event name from the file
    // EG getting the message part of message.js
    let eventName = file.split(".")[0]

    // Binding the event function to bot
    bot.on(eventName, event.bind(null, bot));
    delete require.cache[require.resolve(`./events/${file}`)];    
  })
})


bot.commands = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {
  if(err) return console.error(err);
  files.forEach(file => {
    if(!file.endsWith("js")) return;
    // Load the command
    let props = require(`./commands/${file}`)

    // Get just the command name from the file
    let commandName = file.split(".")[0]
    console.log(`Attempting to load command: ${commandName}`)

    //storing in the command collection
    bot.commands.set(commandName, props)
  })
})



bot.on("ready", () => {
  console.log(`logged in as ${bot.user.tag}`)
})


bot.on('guildMemberAdd', async (member) => {
  await ServerConfig.findOneAndUpdate({id: member.guild.id}, {Members:member.guild.memberCount})
})

bot.on('guildMemberRemove', async (member) => {
  await ServerConfig.findOneAndUpdate({id: member.guild.id}, {Members:member.guild.memberCount})
})

// connection to Mongodb 
bot.mongoose.init();
//log in for the bot
bot.login(config.token);