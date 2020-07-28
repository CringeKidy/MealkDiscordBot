exports.run = (client, message, args) => {
    const Discord = require('discord.js');
    const Colors = require('../Jsons/colors.json');

    if(!message.member.roles.cache.some(r => r.name === 'Admin')){
        message.channel.send("Sorry but your not an admin");
    }
    else{
        const banuser = message.mentions.members.first();
        if(!banuser) return message.channel.send("you need to menition someone");
    
        let reason = args.slice(1).join(" ");
        if(!reason) return message.channel.send("you need add a reason");
    
    
        let banneduser
        banneduser = client.getUser.get(banuser.user.username);
    
        if(!banneduser){
            banneduser = { id: banuser.username, user: banuser.username, BANS: 0, Warns : 0, warn_reason: "", commands: 0}
        }
    
        banneduser.BANS++;
        client.setUser.run(banneduser)
    
        message.guild.channels.cache.get("731125445109612606").send(new Discord.MessageEmbed()
        .setTitle("A User has Been Banned")
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setDescription(`${banuser.user.username} has been **BANNED**`)
        .setColor(Colors.Gold)
        .setThumbnail(banuser.user.displayAvatarURL())
        .addField(`Reason:`, reason)
        );
        
        banuser.ban();
    }
}

module.exports.description = 'this lets admins ban users'
