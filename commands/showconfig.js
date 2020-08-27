const fs = require('fs');
const Discord = require('discord.js');
const Color = require('../Jsons/colors.json');
const Path = './Jsons/Server_Config/';


exports.run = (client, message, args) => {

    var objects = [];
    var Array = [];

    let servername = `${message.guild.name} Server Config`;

    fs.readdir(Path, (err, files) => {
        if (!files.includes(servername)) {
            console.log("this it")
            let configsettings = {
                Modules: [{ name: "Message on new Member", value: true }, { name: "Welcome Page", value: false }, { name: "Admin Tools", value: true }, { name: "Admin Role", value: "" }, { name: "Member Role", value: "" }, { name: "Welcome Page Channel", value: "" }]
            }

            let name = `${message.guild.name} Server Config`
            let data = JSON.stringify(configsettings);
            var path = './Jsons/Server_Config/';
            fs.writeFileSync(path + name, data);
        }
        else {
            fs.readFile(Path + servername, (err, data) => {

                if (err) throw err;
                Array = JSON.parse(data);

                for (i in Array.Modules) {
                    objects.push(Array.Modules[i].name)
                }

                let Serverconfig = Array.Modules.find(r => r.name === "Admin Role").value;

                if (message.member.roles.cache.get(Serverconfig) || message.guild.owner.user.username === message.author.username) {
                    var embed = new Discord.MessageEmbed()
                        .setTitle("Server Configuration")
                        .setColor(Color.Red)
                        .setDescription("This is all of the server settings")
                        .setThumbnail()
                        .addField("Configuration", '\n\u200b')
                        .setThumbnail(message.guild.iconURL())
                        .setFooter(`Created by ${client.user.tag}`, client.user.displayAvatarURL())

                    for (const data of Array.Modules) {
                        let item = data.value
                        let reply = ""

                        if (item === false) {
                            reply = "Disabled"
                        }
                        else if (item === true) {
                            reply = "Enabled"
                        }
                        else if (data.name === "Admin Role") {
                            let thing;
                            try {
                                thing = message.guild.roles.cache.get(Array.Modules.find(r => r.name === "Admin Role").value).name
                            }
                            catch{
                                reply = "undefined"
                            }
                            reply = thing
                        }
                        else if (data.name === "Member Role") {
                            let thing;
                            try {
                                thing = message.guild.roles.cache.get(Array.Modules.find(r => r.name === "Member Role").value).name
                            }
                            catch{
                                reply = "Welcome Page not active"
                            }
                            reply = thing
                        }
                        else {
                            reply = "Not set yet"
                        }

                        embed.addField(data.name, reply, true)

                    }

                    return message.channel.send({ embed });
                }
                if (!message.member.roles.cache.get(Serverconfig)) {
                    return message.channel.send("Sorry your not an admin")
                }
            })
        }
    })


}

module.exports.description = 'This is showing the Server Configuration settings'