const fs = require('fs');
const Discord = require('discord.js');
const Color = require('../Jsons/colors.json');
const Path = './Jsons/Server_Config/'

exports.run = (client, message, args) => {

    let servername = `${message.guild.name} Server Config`;

    var Array = [];
    var objects = [];

    let ServerConfig;

    fs.readdir(Path, (err, files) => {
        if (!files.includes(servername)) {
            let configsettings = {
                Modules: [{ name: "Message on new Member", value: true }, { name: "Welcome Page", value: false }, { name: "Admin Tools", value: true }, { name: "Admin Role", value: "" }, { name: "Member Role", value: "" }, { name: "Welcome Page Channel", value: "" },{name : "Bot Logging", value : false }, {name: "Bot Logging Channel", value : ''}]
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

                ServerConfig = Array.Modules.find(r => r.name === "Admin Role").value;

                if (!message.member.roles.cache.get(ServerConfig)) {


                    if (message.guild.owner.user.username == message.author.username && Array.Modules.find(r => r.name === "Admin Role").value != "") {
                        ReplyMessage();
                    }
                    else if (message.guild.owner.user.username == message.author.username && Array.Modules.find(r => r.name === "Admin Role").value === "") {
                        message.author.send("please give me the name of Admin Role **Case Sensitive**")
                            .then(function () {
                                message.author.dmChannel.awaitMessages(response => message.content, {
                                    max: 1,
                                    time: 300000000,
                                    errors: ['time'],
                                })
                                    .then(collected => {
                                        let item = collected.first().content;
                                        let Role;
                                        try {
                                            Role = message.guild.roles.cache.find(r => r.name === item).id
                                        }
                                        catch{
                                            return message.author.send("Sorry but that dose not seem to be a role in your server");
                                        }

                                        Array.Modules.map(name => {

                                            Array.Modules.find(r => r.name === "Admin Role").value = Role;

                                            fs.writeFileSync(Path + servername, JSON.stringify(Array));
                                        })

                                        message.author.send(`the prammeter **Admin Role** has been changed to **${message.guild.roles.cache.get(Role).name}**`)
                                    });
                            })
                    }
                    else {
                        message.channel.send(`sorry but your are not admin please get <@${message.guild.owner.user.id}> to set the Admin Rool by doing !setconfig`)
                    }
                }
                else if (message.member.roles.cache.get(ServerConfig)) {
                    ReplyMessage();
                }
            });
        }

        function ReplyMessage() {
            let embed = new Discord.MessageEmbed()
                .setTitle('Server Config')
                .addField('Command list', '\n\u200b')
                .addField("Please type the command excalty its **Case Sensitive**:", '\n\u200b')
                .setColor(Color.Orange)
                .setFooter(`Created by ${client.user.tag}`, client.user.displayAvatarURL())
                .setThumbnail(message.guild.iconURL())


            objects.forEach(name => embed.addField(name, '\n\u200b'))

            message.author.send(embed)
                .then(function () {
                    message.author.dmChannel.awaitMessages(response => message.content, {
                        max: 1,
                        time: 300000000,
                        errors: ['time'],
                    })
                        .then(collected => {
                            let item = collected.first().content;
                            let reply = item.trim().split(' ');

                            if (item.includes("Admin Role")) {

                                if (!reply[2]) {
                                    return message.author.send(`please do Admin Role (then name of your role ) \n**Admin Role Admin**`);
                                }

                                if (message.author.username != message.guild.owner.user.username) return message.author.send("Sorry you cant not change that");

                                let Role;
                                try {
                                    Role = message.guild.roles.cache.find(r => r.name === reply[2]).id
                                }
                                catch{
                                    return message.author.send("Sorry but that dose not seem to be a role in your server");
                                }

                                Array.Modules.map(name => {

                                    Array.Modules.find(r => r.name === "Admin Role").value = Role;

                                    fs.writeFileSync(Path + servername, JSON.stringify(Array));
                                })

                                message.author.send(`the prammeter **Admin Role** has been changed to **${message.guild.roles.cache.get(Role).name}**`)
                            }
                            if (item.includes("Welcome Page")) {

                                Array.Modules.map(name => {

                                    if (name.name === item) {

                                        function toggleByName(name, object) {
                                            for (let obj of object.Modules) {
                                                if (obj.name == name) {
                                                    obj.value = !obj.value;
                                                    break;
                                                }
                                            }
                                        }

                                        toggleByName(item, Array);
                                        fs.writeFileSync(Path + servername, JSON.stringify(Array));
                                    }
                                })
                                if (Array.Modules.find(r => r.name === "Welcome Page").value === true) {
                                    message.guild.channels.create("Welcome Page", { reason: 'Making what the Server needs', type: 'text' })
                                        .then(channel => {
                                            message.guild.channels.cache.get(channel.id).send("please Delete this message and write a welcome message and put **!agree** at the end and also rember to ***pin*** the message or i will delete it")

                                            Array.Modules.map(name => {

                                                Array.Modules.find(r => r.name === "Welcome Page Channel").value = channel.id;

                                                fs.writeFileSync(Path + servername, JSON.stringify(Array));

                                            })
                                        })
                                    message.guild.roles.create({
                                        data: {
                                            name: "Member",
                                            color: "grey"
                                        },
                                        reason: "just making what the bot needs"
                                    })
                                        .then(role => {
                                            Array.Modules.map(name => {

                                                Array.Modules.find(r => r.name === "Member Role").value = role.id;

                                                fs.writeFileSync(Path + servername, JSON.stringify(Array));

                                            })
                                        })
                                    message.author.send("i have made a role called **Member** fell free to customize it \n also if you are gonna hide channels from everyone and only show certain channels to memebers please give me the Role of Administrator so i can be used in all channels")
                                }
                                if (Array.Modules.find(r => r.name === "Welcome Page").value === false) {
                                    console.log("no")
                                }

                            }
                            if (item.includes("Member Role")) {

                                if (!reply[2]) {
                                    return message.author.send(`please do Member Role (then name of your role ) EG: \n**Member Role Member**`);
                                }

                                if (message.author.username != message.guild.owner.user.username) return message.author.send("Sorry you cant not change that");

                                let Role;
                                try {
                                    Role = message.guild.roles.cache.find(r => r.name === reply[2]).id
                                }
                                catch{
                                    return message.author.send("Sorry but that dose not seem to be a role in your server");
                                }

                                Array.Modules.map(name => {

                                    Array.Modules.find(r => r.name === "Member Role").value = Role;

                                    fs.writeFileSync(Path + servername, JSON.stringify(Array));
                                })

                                message.author.send(`the prammeter **Member Role** has been changed to **${message.guild.roles.cache.get(Role).name}**`)


                            }
                            if (item.includes("Welcome Page Channel")) {

                                if (!reply[3]) {
                                    return message.author.send(`please do Welcome Page Channel (then name of your role ) EG: \n**Welcome Page Channel welcome-page**`);
                                }

                                if (message.author.username != message.guild.owner.user.username) return message.author.send("Sorry you cant not change that");

                                console.log(reply)

                                let Channel;
                                try {
                                    Channel = message.guild.channels.cache.find(r => r.name === reply[3]).id
                                }
                                catch{
                                    return message.author.send("Sorry but that dose not seem to be a role in your server");
                                }

                                Array.Modules.map(name => {

                                    Array.Modules.find(r => r.name === "Welcome Page Channel").value = Channel;

                                    fs.writeFileSync(Path + servername, JSON.stringify(Array));
                                })

                                message.author.send(`the prammeter **Welcome Page Channel** has been changed to **${reply[3]}**`)


                            }
                            if (item.includes("Bot Logging")) {

                                Array.Modules.map(name => {

                                    if (name.name === item) {

                                        function toggleByName(name, object) {
                                            for (let obj of object.Modules) {
                                                if (obj.name == name) {
                                                    obj.value = !obj.value;
                                                    break;
                                                }
                                            }
                                        }

                                        toggleByName(item, Array);
                                        fs.writeFileSync(Path + servername, JSON.stringify(Array));
                                    }
                                })
                                if (Array.Modules.find(r => r.name === "Bot Logging").value === true) {
                                    message.guild.channels.create("bot-logging", { reason: 'Making what the Server needs', type: 'text' })
                                        .then(channel => {
                                            message.guild.channels.cache.get(channel.id).send("this is where i will post all of the logs")

                                            Array.Modules.map(name => {

                                                Array.Modules.find(r => r.name === "Bot Logging Channel").value = channel.id;

                                                fs.writeFileSync(Path + servername, JSON.stringify(Array));

                                            })
                                        })
                                }
                                if (Array.Modules.find(r => r.name === "Bot Logging").value === false) {
                                    console.log("no")
                                }
                            }
                           
                            if (item.includes("Bot Logging Channel")) {

                                if (!reply[3]) {
                                    return message.author.send(`please do Bot Logging Channel (then name of your role ) EG: \n**Bot Logging Channel bot-logs**`);
                                }

                                if (message.author.username != message.guild.owner.user.username) return message.author.send("Sorry you cant not change that");

                                console.log(reply)

                                let Channel;
                                try {
                                    Channel = message.guild.channels.cache.find(r => r.name === reply[3]).id
                                }
                                catch{
                                    return message.author.send("Sorry but that dose not seem to be a role in your server");
                                }

                                Array.Modules.map(name => {

                                    Array.Modules.find(r => r.name === "Welcome Page Channel").value = Channel;

                                    fs.writeFileSync(Path + servername, JSON.stringify(Array));
                                })

                                message.author.send(`the prammeter **Welcome Page Channel** has been changed to **${reply[3]}**`)


                            }
                            else {
                                Array.Modules.map(name => {

                                    if (name.name === item) {

                                        function toggleByName(name, object) {
                                            for (let obj of object.Modules) {
                                                if (obj.name == name) {
                                                    obj.value = !obj.value;
                                                    break;
                                                }
                                            }
                                        }

                                        // Changes admin tools from true -> false
                                        toggleByName(item, Array);
                                        fs.writeFileSync(Path + servername, JSON.stringify(Array));

                                        message.author.send(`the prammeter **${item}** has been changed to **${Array.Modules.find(r => r.name === item).value}**`)
                                    }
                                })
                            }
                        })
                        .catch(e => {
                            console.log(e)
                        });
                });
        }
    });
}

module.exports.description = 'This is setting the Server Configuration EG Message when a member joins'