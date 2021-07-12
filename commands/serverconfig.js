const ServerConfig = require("../Schema/ServerConfigSchema.js")
const {MessageEmbed} = require('discord.js')
const Color = require('../Jsons/colors.json')

module.exports={
    "AdminCommand": true,
    async execute(bot, message, args){
        
        const Config = await ServerConfig.findOne({_id:message.guild.id})
        const Prefix = Config.get('prefix');
        const AdminRole = Config.get('AdminRole');
        const MemberjoinChannel = Config.get('MemberJoinChannel');
        const ServerId = Config.get('_id')
        
        const ServerName = bot.guilds.cache.get(ServerId).name


        const ServerConfigEmbed = {
            title: "Server Configuration",
            description:`This is all the options that you can configure for **${ServerName}**`,
            color: Color.Blue,
            fields:[
                {
                    name:`${ServerName} Parameters`, 
                    value:"** **"
                },
                {
                    name:'Prefix',
                    value: Prefix
                },
                {
                    name: 'Admin role',
                    value: AdminRole
                },
                {
                    name:"Member Join Channel",
                    value:MemberjoinChannel
                }
            ],
            timestamp: new Date(),
            footer:{
                text:`Created by ${bot.user.tag}`,
                icon_url: bot.user.displayAvatarURL()
            }
        }

        message.author.send({embed: ServerConfigEmbed}).then(ServerConfigEmbed => {
            ServerConfigEmbed.react("👍");
            ServerConfigEmbed.react("👎");
            ServerConfigEmbed.react("✅");
            ServerConfigEmbed.react("❌");

            const fillter = (reaction, user) => {
                return ['👍', '👎', '✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
            }

            ServerConfigEmbed.awaitReactions(fillter, {max: 1, time:60000, errors:['time']})
                .then(collected => {
                    const reaction = collected.first();

                    if(reaction.emoji.name === '👍'){
                        message.author.send("thumbs up")
                    }
                    if(reaction.emoji.name === '👎'){
                        message.author.send("thumbs down")
                    }
                    if(reaction.emoji.name === '✅'){
                        message.author.send("Check")
                    }
                    if(reaction.emoji.name === '❌'){
                        console.log('over')
                        done == false
                        message.author.send("X")
                    }                    
                })
                .catch(collected => {
                    message.author.send('you didnt react')
                })

        })
    }
}