//Namespace Stuff
const Discord = require('discord.js')
const fs = require('fs')
const chalk = require('chalk')
require('dotenv').config();

const bot = new Discord.Client()
const Colors = require('./Jsons/colors.json')
const ServerConfig = require("./Schema/ServerConfigSchema.js");

bot.mongoose = require('./Util/mogodb.js')

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
bot.commandName = new Discord.Collection()

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
    bot.commandName.set(commandName)
  })
})

bot.on("ready",() => {
  console.log(chalk.green(`logged in as ${bot.user.tag}`))
})

bot.on('guildCreate', async guild => {
  let channelId;
  let channels = guild.channels.cache;

  const startEmbed = {
    title:"Thank you for adding me",
    description:"Thank you for adding me to your server here some commands i recommned to do first",
    color: Colors.Purple,
    fields:[
      {
        name:"!Serverconfig",
        value:"This lets you start to configure the server settings i would recommned setting the admin role first"
      },
      {
        name:"!addroles",
        value:"i will make all the roles needed like Admin role and mute role"
      },
      {
        name:"!help",
        value:"have a look at all the commands i can do"
      },
      {
        name:"Vist the github",
        value:"https://github.com/CringeKidy/MealkDiscordBot"
      }
    ],
    timestamp: new Date(),
    footer:{
      text:`Created by ${bot.user.tag}`,
      icon_url: bot.user.displayAvatarURL()
    }
  }

  channelLoop:
    for(let key in channels){
      let c = channels[key]
      if(c[1].type === "text"){
        channelId = c[0];
        break channelLoop;
      }
    }

  let channel = guild.channels.cache.get(guild.systemChannelID || channelId);
  channel.send({embed: startEmbed});

  ServerConfig.countDocuments({_id: guild.id}, function (err, count) {
    if(err) return console.log(err);
    if(count === 0){
      ServerConfig.create({
        _id: guild.id,
        MemberCount: guild.memberCount
      });
      console.log(`${guild.name} has been saved to the db`)
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
    color: Colors.Green,
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
  if(MemberChannel = null){
    return;
  }
})

bot.on('guildMemberRemove', async (member) => {
  await ServerConfig.findOneAndUpdate({_id: member.guild.id}, {MemberCount:member.guild.memberCount})
})

bot.on('messageReactionAdd', async (reaction, user) =>{
  if(reaction.partial){
    try{
      await reaction.fetch();
    }
    catch(err){
      console.log(err)
      return
    }
  }

  if(reaction.emoji.name === '🔊' && reaction.count > 1){
    reaction.message.channel.send("Reply with what you would like to change prefix to(p.s type cancel to cancel change)").then(() => {
      reaction.message.channel.awaitMessages(m => m.channel.id === reaction.message.channel.id,{
            max:1, 
            time: 30000,
            errors:['time']
        })
        .then(async msg =>{
            const m = msg.first();

            if(m.content === 'cancel'){
                reaction.message.channel.send("ok cancling change")
            }else{
                await ServerConfig.findOneAndUpdate({_id: reaction.message.guild.id}, {prefix: m.content})
                reaction. message.reply(`Ok i have changed the prefix to ${m.content}.\ndo !serverstatus to see the server configruation`)
            }
        })
    })
  }
  if(reaction.emoji.name === '👮‍♂️' && reaction.count > 1){
    reaction.message.channel.send("Reply with the name of the role for admins **Case Sesitive**(p.s type cancel to cancel change)").then(() => {
      reaction.message.channel.awaitMessages(m => m.channel.id === reaction.message.channel.id,{
            max:1, 
            time: 30000,
            errors:['time']
        })
        .then(async msg =>{
            const m = msg.first();

            if(m.content === 'cancel'){
              reaction.message.channel.send("ok cancling change")
            }else{
              if(!AdminRole){
                return message.reply(`Sorry that is not a existing role`)
              }

              await ServerConfig.findOneAndUpdate({_id: reaction.message.guild.id}, {AdminRole: AdminRole})
              reaction.message.reply(`Ok i have changed the AdminRole to ${m.content}.\ndo !serverstatus to see the server configruation`)
            }
        })
    })
  }
  if(reaction.emoji.name === '🔇' && reaction.count > 1){
    reaction.message.channel.send("Reply with the name of the role for muting people **Case Sesitive**(p.s type cancel to cancel change)").then(() => {
      reaction.message.channel.awaitMessages(m => m.channel.id === reaction.message.channel.id,{
            max:1, 
            time: 30000,
            errors:['time']
        })
        .then(async msg =>{
            const m = msg.first();

            if(m.content === 'cancel'){
               reaction.message.channel.send("ok cancling change")
            }else{
              let MuteRole;
              try{
                MuteRole =  reaction.message.guild.roles.cache.find(r => r.name === m.content).id

              }
              catch{
                return message.reply('Sorry that is not a existing role')
              }

                await ServerConfig.findOneAndUpdate({_id: reaction.message.guild.id}, {MuteRole: m.content})
                reaction.message.reply(`Ok i have changed the MuteRole to ${m.content}.\ndo !serverstatus to see the server configruation`)
            }
        })
    })
  }
  if(reaction.emoji.name === '🎫' && reaction.count > 1){
    reaction.message.channel.send("Tag the channel please.put null to turn off this feature(p.s type cancel to cancel change)").then(() => {
      reaction.message.channel.awaitMessages(m => m.channel.id === reaction.message.channel.id,{
            max:1, 
            time: 30000,
            errors:['time']
        })
        .then(async msg =>{
            const m = msg.first();

            if(m.content === 'cancel'){
              reaction.message.channel.send("ok cancling change")
            }else{
                let channel_id = m.content.replace('<','').replace('>','').replace('#','')

                let channel = reaction.message.guild.channels.cache.get(channel_id).id 

                await ServerConfig.findOneAndUpdate({_id: reaction.message.guild.id}, {MemberJoinChannel: channel})
                reaction.message.reply(`Ok i have changed the Member Join Channel to ${m.content}.\ndo !serverstatus to see the server configruation`)
            }
        })
    })
  }
})

// connection to Mongodb 
bot.mongoose.init();
//log in for the bot
bot.login(process.env.TOKEN);