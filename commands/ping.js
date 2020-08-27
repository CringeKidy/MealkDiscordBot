const Discord = require('discord.js');

exports.run = (client, message, args) => {
    var ping = Date.now() - message.createdTimestamp + " ms";

    message.channel.send(new Discord.MessageEmbed()
        .addField('Ping:', ping)

    );
}

module.exports.description = 'This is how fast your message talks to the bot'