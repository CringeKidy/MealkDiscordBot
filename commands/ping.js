exports.run = (client, message, args) => {

    const Discord = require('discord.js');

    var ping = Date.now() - message.createdTimestamp + " ms";

    message.channel.send(new Discord.MessageEmbed() 
        .addField('Ping:', ping) 
       
    );


}