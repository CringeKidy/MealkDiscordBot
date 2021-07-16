const Colors = require('../Jsons/colors.json')

module.exports={
    "AdminCommand": true,
    "Description": "this command allows admins to add roles to users",
    "Format": "!users add/remove <user> <role>",
    "example": "!users add @CringeKidy Admin",
    async execute(bot, message, args){
        let userid;
        if(args.length === 0){
            return message.reply('please use !help user to understand how to use this command')
        }

        try{
            userid = args[1].replace('!','').replace('<','').replace('>','').replace('#','').replace('@', '');
        }
        catch(err){
            return message.reply('Sorry User dose not exists')
        }
        const Username = message.guild.member(userid).user.username
        const RoleID = message.guild.roles.cache.find(r => r.name === args[2]).id

        if(!RoleID) return message.reply("Sorry that role dose not exists.")
        
        const ErrorEmbed = {
            title: `there was an Error ${args[0]}ing the role to ${Username}`,
            description:`i cant ${args[0]} ${args[2]} role to ${args[1]} because of one of these reasons`,
            color: Colors.Red,
            fields: [
                {
                    name:"Dont have Permission",
                    value:"I do not have the permisson **Manage Roles** for my role"
                },
                {
                    name:"my role is lower than the users role",
                    value:"in discord you can move around the roles so if you move my role higher i sould be able to add the role"

                },
                {
                    name:"user is Server owner",
                    value:"i cannot at all at all add roles to Server Owners cause there to high in role postion"
                }
            ],
            timestamp: new Date(),
            footer:{
                text:`Created by ${bot.user.tag}`,
                icon_url: bot.user.displayAvatarURL()
            }
        }

        if(args[0].includes('add')){
           
            message.guild.member(userid).roles.add(RoleID).catch(err =>{
                message.reply({embed: ErrorEmbed})
            })
            
        }
        if(args[0].includes('remove')){
            message.guild.member(userid).roles.remove(RoleID).catch(err =>{
                message.reply({embed: ErrorEmbed})
            })
        }
    }
}