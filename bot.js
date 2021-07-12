//Namespace Stuff
const Discord = require('discord.js')
const fs = require('fs')
const chalk = require('chalk')
require('dotenv').config();

const bot = new Discord.Client()
const config = require('./Jsons/config.json');
const color = require('./Jsons/colors.json')
const ServerConfig = require("./Schema/ServerConfigSchema.js");

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
    console.log(chalk.yellow(`Attempting to load command: ${commandName}`))

    //storing in the command collection
    bot.commands.set(commandName, props)
  })
})



bot.on("ready", async () => {
  console.log(chalk.green(`logged in as ${bot.user.tag}`))
})

bot.on('guildCreate', async guild => {
  let channelId;
  let channels = guild.channels.cache;

  channelLoop:
    for(let key in channels){
      let c = channels[key]
      if(c[1].type === "text"){
        channelId = c[0];
        break channelLoop;
      }
    }

  let channel = guild.channels.cache.get(guild.systemChannelID || channelId);
  channel.send(`Thank you for inviting me to the server to start configuring the settings i have for the server please do !serverconfig in a text channel`);

  ServerConfig.countDocuments({_id: guild.id}, function (err, count) {
    if(err) return console.log(err);
    if(count === 0){
      ServerConfig.create({
        _id: guild.id,
        MemberCount: guild.memberCount
      });
      console.log('bot has joined there server and saved to DB')
    }
  })
})  

bot.on('guildMemberAdd', async (member) => {
  await ServerConfig.findOneAndUpdate({_id: member.guild.id}, {MemberCount:member.guild.memberCount})
  const UserInfo = await ServerConfig.findOne({_id:member.guild.id})

  let MemberCount = UserInfo.get('MemberCount')
  let MemberChannel = UserInfo.get('MemberJoinChannel')

  const messageEmbed = {
    title:"New user as joined the channel",
    description:"This user has just joined the channel and now gets a welcoming for it",
    color: color.Green,
    fields:[
      {
        name:"Username",
        value:member.user.tag,
        inine: true

      },
      {
        name:"Members Now",
        value:MemberCount
      }
    ],
    thumbnail:{
      url: member.user.displayAvatarURL()
    },
    timestamp: new Date(),
    footer:{
      text:`Created by ${bot.user.tag}`,
      icon_url: bot.user.displayAvatarURL()
    }
  }

  if(MemberChannel != null){
    member.guild.channels.cache.get(MemberChannel).send({embed: messageEmbed})
  }

})

bot.on('guildMemberRemove', async (member) => {
  await ServerConfig.findOneAndUpdate({_id: member.guild.id}, {MemberCount:member.guild.memberCount})
})

// connection to Mongodb 
bot.mongoose.init();
//log in for the bot
bot.login(process.env.TOKEN);