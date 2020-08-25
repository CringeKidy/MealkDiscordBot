const fs = require('fs')
const Discord = require('discord.js')

exports.run = (client, message, args) => {

    console.log(message.guild.channels.cache.find(r => r.name === "welcome-page").id)

}   