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
                    value:"The emoji corsponeds to the Setting"
                },
                {
                    name:'🔊Prefix',
                    value: Prefix
                },
                {
                    name: '👮‍♂️Admin role',
                    value: AdminRole
                },
                {
                    name:"🎫Member Join Channel",
                    value:MemberjoinChannel
                }
            ],
            timestamp: new Date(),
            footer:{
                text:`Created by ${bot.user.tag}`,
                icon_url: bot.user.displayAvatarURL()
            }
        }

        await message.channel.send({embed: ServerConfigEmbed}).then(async ServerConfigEmbed => {
            await ServerConfigEmbed.react("🔊");
            await ServerConfigEmbed.react("👮‍♂️");
            await ServerConfigEmbed.react("🎫");

            const fillter = (reaction, user) => {
                return ['🔊', '👮‍♂️', '🎫'].includes(reaction.emoji.name) && user.id === message.author.id;
            }

            ServerConfigEmbed.awaitReactions(fillter, {max: 1, time:60000, errors:['time']})
                .then(collected => {
                    const reaction = collected.first();
                    
                    if(reaction.emoji.name === '🔊'){
                        message.channel.send("Reply with what you would like to change prefix to(p.s type cancel to cancel change)").then(() => {
                            message.channel.awaitMessages(m => m.channel.id === message.channel.id,{
                                max:1, 
                                time: 30000,
                                errors:['time']
                            })
                            .then(async msg =>{
                                const m = msg.first();

                                if(m.content === 'cancel'){
                                    message.channel.send("ok cancling change")
                                }else{
                                    await ServerConfig.findOneAndUpdate({_id: message.guild.id}, {prefix: m.content})
                                    message.channel.send(`Ok i have changed the prefix to ${m.content}`)
                                }
                            })
                        })
                    }
                    if(reaction.emoji.name === '👮‍♂️'){
                        message.channel.send("Reply with the name of the role for admins **Case Sesitive**(p.s type cancel to cancel change)").then(() => {
                            message.channel.awaitMessages(m => m.channel.id === message.channel.id,{
                                max:1, 
                                time: 30000,
                                errors:['time']
                            })
                            .then(async msg =>{
                                const m = msg.first();

                                if(m.content === 'cancel'){
                                    message.channel.send("ok cancling change")
                                }else{
                                    await ServerConfig.findOneAndUpdate({_id: message.guild.id}, {AdminRole: m.content})
                                    message.channel.send(`Ok i have changed the AdminRole to ${m.content}`)
                                }
                            })
                        })
                    }
                    if(reaction.emoji.name === '🎫'){
                        message.channel.send("Reply with the channel name **Case Sesitive** put null to turn off this feature(p.s type cancel to cancel change)").then(() => {
                            message.channel.awaitMessages(m => m.channel.id === message.channel.id,{
                                max:1, 
                                time: 30000,
                                errors:['time']
                            })
                            .then(async msg =>{
                                const m = msg.first();

                                if(m.content === 'cancel'){
                                    message.channel.send("ok cancling change")
                                }else{
                                    let channel_id = m.content.replace('<','').replace('>','').replace('#','')

                                    let channel = message.guild.channels.cache.get(channel_id).id 

                                    await ServerConfig.findOneAndUpdate({_id: message.guild.id}, {MemberJoinChannel: channel})
                                    message.channel.send(`Ok i have changed the Member Join Channel to ${m.content}`)
                                }
                            })
                        })
                    }    
                })
                .catch(collected => {
                    message.channel.send('you didnt react')
                })

        })
    }
}