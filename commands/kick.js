const fs = require('fs')
var Array = [];

exports.run = (client, message, args) => {

    fs.readFile(`./Jsons/Server_Config/${message.guild.name} Server Config`, function (err, data) {
        if (err) throw err;
        Array = JSON.parse(data);

        let ServerConfig = Array.Modules.find(r => r.name === "Admin Role").value;

        if (!message.member.roles.cache.get(ServerConfig)) {
            message.channel.send("Sorry but your not an admin if you have a admin role do **!setconfig** and set the admin role");
        }
        else {
            const user = message.mentions.members.first();
            if (!user) return message.channel.send("you need to meintion someone");
            user.kick();
            message.channel.send(`** ${user} ** has been kicked`)
        }
    })
}

module.exports.description = 'this is a command that let admin kick users'

