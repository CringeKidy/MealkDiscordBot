exports.run = (client, message, args) => {
    const Discord = require('discord.js');

    const SQLite = require("better-sqlite3");
    const sql = new SQLite('./USERS.sqlite');

    const Colors = require('../Jsons/colors.json');

    const target = { 
       user: message.mentions.users.first(),
       joined: message.member.joinedAt
    }

    if(message.mentions.members.first()){
        let usertarget;

        usertarget = client.getUser.get(target.user.username);

        if(!usertarget){
            usertarget = { id: target.user.username, user: target.user.username, BANS: 0, Warns : 0, warn_reason: "", commands: 0}
        }

        client.setUser.run(usertarget);
        
        const top10 = sql.prepare("SELECT * FROM USERS WHERE user = ? ORDER BY BANS DESC LIMIT 1;").all(target.user.username);


        //Making embed to show the user info
        const embed = new Discord.MessageEmbed()
            .setTitle("User Info")
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setDescription(`this is **${target.user.username}** info`)
            .setColor(Colors["Pink(Bright)"])
            .setThumbnail(target.user.displayAvatarURL())
            .setTimestamp();
        

        //showing how many times user has asked a command 
        for(const data of top10) {
            embed.addField(data.user, `has been BANED: ${data.BANS} times`);
        }
        for(const data of top10) {
            embed.addField(data.user, `has asked: ${data.commands} Commands`);
        }
        embed.addField(`${target.user.username} joined at`, `${target.joined}`)
        return message.channel.send({embed});
    }
    else{
        const top10 = sql.prepare("SELECT * FROM USERS WHERE user = ? ORDER BY BANS DESC LIMIT 1;").all(message.author.username);

        if(!top10){
            top10 = { id: `${message.author.username}`, user: message.author.username, GuildID: message.guild.id, BANS: 0, Warns : 0, warn_reason: "", commands: 0}
        }

        //Making embed to show the user info
        const embed = new Discord.MessageEmbed()
            .setTitle("User Info")
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setDescription(`this is **${message.author.tag}** info`)
            .setColor(Colors["Pink(Bright)"])
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp();
        

        //showing how many times user has asked a command 
        for(const data of top10) {
            embed.addField(data.user, `has been BANED: ${data.BANS} times`);
        }
        for(const data of top10) {
            embed.addField(data.user, `has asked: ${data.commands} Commands`);
        }
        embed.addField(`${message.author.username} joined at`, `${message.member.joinedAt}`)
        return message.channel.send({embed});
    }
}

module.exports.description = 'this is infomation about a user eg: there name, how many commands they have asked'