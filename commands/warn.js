const fs = require('fs')
var Array = [];


exports.run = (client, message, args) => {

    fs.readFile(`./Jsons/Server_Config/${message.guild.name} Server Config`, function (err, data) {
        if (err) throw err;
        Array = JSON.parse(data);

        let ServerConfig = Array.Modules.find(r => r.name === "Admin Role").value;
        let LogChannel = message.guild.channels.cache.get(Array.Modules.find(r => r.name === "Bot Logging Channel").value)
        let BotLogging = Array.Modules.find(r => r.name === "Bot Logging").value;

        if (!message.member.roles.cache.get(ServerConfig)) {
            message.channel.send("Sorry but your not an admin if you have a admin role do **!setconfig** and set the admin role");
        }
        else {
            try {
                const warnuser = message.mentions.members.first();
                if (!warnuser) return message.channel.send("you need to menition someone")

                let warnreason = args.slice(1).join(" ");

                let warnedUser
                warnedUser = client.getUser.get(warnuser.user.username);

                if (!warnedUser) {
                    warnedUser = { id: warnedUser.username, user: warnedUser.username, BANS: 0, Warns: 0, warn_reason: "", commands: 0 }
                }

                warnedUser.Warns++;
                warnedUser.warn_reason = warnreason;

                if (warnedUser.Warns === 3) {
                    warnedUser.Warns = 0;
                    warnuser.kick("has had three warnings");
                    message.channel.send(`${warnuser} has been banned because they have been warned 3 times`)
                }
                else if (warnedUser.Warns === 2) {
                    warnuser.send("if you get one more warning you are getting kicked");
                    if(BotLogging === true){
                        message.guild.channels.cache.get(LogChannel).send(new Discord.MessageEmbed()
                            .setTitle("A User has Been Banned")
                            .setAuthor(client.user.username, client.user.displayAvatarURL())
                            .setDescription(`${banuser.user.username} has been **BANNED**`)
                            .setColor(Colors.Gold)
                            .setThumbnail(banuser.user.displayAvatarURL())
                            .addField(`Reason:`, reason)
                        );
                    }
                }
                else {
                    if(BotLogging === true){
                        message.guild.channels.cache.get(LogChannel).send(new Discord.MessageEmbed()
                            .setTitle("A User has Been Banned")
                            .setAuthor(client.user.username, client.user.displayAvatarURL())
                            .setDescription(`${banuser.user.username} has been **BANNED**`)
                            .setColor(Colors.Gold)
                            .setThumbnail(banuser.user.displayAvatarURL())
                            .addField(`Reason:`, reason)
                        );
                    }
                }

                client.setUser.run(warnedUser);

            }
            catch (e) {
                console.error(e)
            }
        }
    })
}

module.exports.description = 'this lets admins warn users'
