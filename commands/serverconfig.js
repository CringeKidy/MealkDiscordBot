const ServerConfig = require("../Schema/ServerConfigSchema.js")
const {MessageEmbed} = require('discord.js')
const Color = require('../Jsons/colors.json')

module.exports={
    "AdminCommand": true,
    async execute(bot, message, args){
        
        const Config = await ServerConfig.findOne({_id:message.guild.id})
        
        const Prefix = Config.get('prefix');
        const AdminRole = Config.get('AdminRole');
        const MuteRole = Config.get('MuteRole');
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
                    name: '🔇Mute role',
                    value: AdminRole
                },
                {
                    name:"🎫Member Join Channel",
                    value:`<#${MemberjoinChannel}>`
                },
                {
                    name:"dont have to go through this",
                    value:"you can just do !severconfig prefix/adminrole/memberjoinchannel <change item> eg !serverconfig prefix ?"
                },
                {
                    name:"This message will get deleted in 1 minute",
                    value:"** **"
                },
            ],
            timestamp: new Date(),
            footer:{
                text:`Created by ${bot.user.tag}`,
                icon_url: bot.user.displayAvatarURL()
            }
        }
        
        if(args.length > 0){
            if(args[0].toLowerCase().includes('prefix')){
                if(args[1] != null){
                    await ServerConfig.findOneAndUpdate({_id: message.guild.id}, {prefix: args[1]})
                    message.reply(`Ok i have changed the prefix to **${args[1]}**.\ndo !serverstatus to see the server configruation`)
                }
                else{
                    message.reply("no prefix argument was provied. eg !serverconfig prefix **<what you want to use for prefix>**")
                }
            }
            if(args[0].toLowerCase().includes('adminrole')){
                if(args[1] != null){
                    await ServerConfig.findOneAndUpdate({_id: message.guild.id}, {AdminRole: args[1]})
                    message.reply(`Ok i have changed the Admin Role to **${args[1]}**.\ndo !serverstatus to see the server configruation`)
                }
                else{
                    message.reply("no Admin Role argument was provied. eg !serverconfig AdminRole **<the name of the role you want to control me>**")
                }
            }
            if(args[0].toLowerCase().includes('muterole')){
                if(args[1] != null){
                    await ServerConfig.findOneAndUpdate({_id: message.guild.id}, {MuteRole: args[1]})
                    message.reply(`Ok i have changed the Mute Role to **${args[1]}**.\ndo !serverstatus to see the server configruation`)
                }
                else{
                    message.reply("no Mute Role argument was provied. eg !serverconfig MuteRole **<the name of the role you want to control me>**")
                }
            }
            if(args[0].toLowerCase().includes('memberjoinchannel')){
                if(args[1] != null){
                    if(args[1].includes('null')){
                        await ServerConfig.findOneAndUpdate({_id: message.guild.id}, {MemberJoinChannel: null})
                        message.reply(`Ok i have changed the Member Join Channel to **${args[1]}**.\ndo !serverstatus to see the server configruation`)
                    }
                    else{
                        let channel_id = args[1].replace('<','').replace('>','').replace('#','')
                        
                        await ServerConfig.findOneAndUpdate({_id: message.guild.id}, {MemberJoinChannel: channel_id})
                        message.reply(`Ok i have changed the Member Join Channel to **${args[1]}**.\ndo !serverstatus to see the server configruation`)
                    }
                }
                else{
                    message.reply("no prefix argument was provied. eg !serverconfig memberjoinchannel **#<and the name of the channel you want to use>**")
                }
            }
        }
        else{
            await message.channel.send({embed: ServerConfigEmbed}).then(async ServerConfigEmbed => {
            await ServerConfigEmbed.react("🔊");
            await ServerConfigEmbed.react("👮‍♂️");
            await ServerConfigEmbed.react("🔇");
            await ServerConfigEmbed.react("🎫");

            ServerConfigEmbed.delete({timeout:60000})
            });
        }
0.
    }
}