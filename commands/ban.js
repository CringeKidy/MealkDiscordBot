const Discord = require('discord.js');
const Colors = require('../Jsons/colors.json');
const fs = require('fs');
var Array = [];


exports.run = (client, message, args) => {

    fs.readFile(`./Jsons/Server_Config/${message.guild.name} Server Config`, function (err, data) {
        if (err) throw err;
        Array = JSON.parse(data);

        let ServerConfig = Array.Modules.find(r => r.name === "Admin Role").value;
        console.log(Array.Modules.find(r => r.name === "Bot Logging Channel").value)
        let LogChannel = client.guild.channels.cache.get(Array.Modules.find(r => r.name === "Bot Logging Channel").value)
        let BotLogging = Array.Modules.find(r => r.name === "Bot Logging").value;

        if (!message.member.roles.cache.get(ServerConfig)) {
            message.channel.send("Sorry but your not an admin if you have a admin role do **!setconfig** and set the admin role");
        }
        else {
            const banuser = message.mentions.members.first();
            if (!banuser) return message.channel.send("you need to menition someone");

            let reason = args.slice(1).join(" ");
            if (!reason) return message.channel.send("you need add a reason");

            let banneduser
            banneduser = client.getUser.get(banuser.user.username);

            if (!banneduser) {
                banneduser = { id: banuser.username, user: banuser.username, BANS: 0, Warns: 0, warn_reason: "", commands: 0 }
            }

            banneduser.BANS++;
            client.setUser.run(banneduser)

            if(BotLogging === true){

                if(!LogChannel){
                    return message.channel.send('there isnt a channel defined or it dosent exist anymore please do !setconfig')
                }

                message.guild.channels.cache.get(LogChannel).send(new Discord.MessageEmbed()
                    .setTitle("A User has Been Banned")
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setDescription(`${banuser.user.username} has been **BANNED**`)
                    .setColor(Colors.Gold)
                    .setThumbnail(banuser.user.displayAvatarURL())
                    .addField(`Reason:`, reason)
                );
            }


            banuser.ban();
        }
    })
}

module.exports.description = 'this lets admins ban users'
