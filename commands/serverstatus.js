const ServerConfig = require("../Schema/ServerConfigSchema.js")
const {MessageEmbed} = require('discord.js')
const Color = require('../Jsons/colors.json')

module.exports={
    "AdminCommand": false,
    "Description": "this users see the server settings and member count",
    "Format": "!serverstatus",
    "example": "!serverstatus",
    async execute(bot, message, args){
        
        if(message.author.bot) return;

        const Config = await ServerConfig.findOne({_id:message.guild.id});

        const Prefix = Config.get('prefix');
        const AdminRole = Config.get('AdminRole');
        const MuteRole = Config.get('MuteRole')
        const MemberjoinChannel = Config.get('MemberJoinChannel');
        
        const ServerId = Config.get('_id')
        const ServerName = bot.guilds.cache.get(ServerId).name

        const MemberCount = Config.get('MemberCount')
        const ServerStatus = {
            title: "Server Settings",
            description:`**${ServerName}**'s Settings`,
            color: Color.Gold,
            fields:[
                {
                    name:'Prefix',
                    value: Prefix
                },
                {
                    name: 'Admin role',
                    value: AdminRole,
                    inline: true
                },
                {
                    name: 'Mute role',
                    value: MuteRole,
                    inline: true
                },
                {
                    name: '** **',
                    value: '** **',
                    inline: true
                },
                {
                    name:"Member Join Channel",
                    value:`<#${MemberjoinChannel}>`,
                    inline: true
                },
                {
                    name:"Members in the Server",
                    value:MemberCount,
                    inline: true
                }
            ],
            timestamp: new Date(),
            footer:{
                text:`Created by ${bot.user.tag}`,
                icon_url: bot.user.displayAvatarURL()
            }
        }

        await message.channel.send({embed: ServerStatus})
    }
}