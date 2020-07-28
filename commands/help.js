const { DiscordAPIError } = require('discord.js');

exports.run = (client, message, args) => {

    const fs = require('fs')
    const Discord = require('discord.js')

    const data = [];
    let keys = Array.from(client.commands.keys());

    data.push(`***${keys}***`);


    if(keys.includes(args.toString(), 0)){
        let command = "./" + args
        
        const description = require(command);


        if(!description.description){
            message.channel.send('its seems to be that this command dosent have a description')
        }
        else{
            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Command Help')
                .addField('Command', args, true)
                .addField('Description', description.description, true)
                .setAuthor(client.user.tag)
                .setDescription('This is the command and what it dose')
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter(`Created by ${client.user.tag}`)
                .setTimestamp()
            );
        }
    }
    else{
        message.channel.send(`That is not a command i have here are my commands: ${data}` )
    }
}