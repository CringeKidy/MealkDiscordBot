const ServerConfig = require("../Schema/ServerConfigSchema.js");
module.exports={
    "AdminCommand": false,
    "Description": "this is to add the roles needed for the bot",
    "Format": "!addroles",
    "example": "!addroles",
    execute(bot, message, args){
        const roles = ["Admin", "Muted"];
        const AdminRole = message.guild.roles.cache.find(r => r.name === roles[0]) 
        const MutedRole = message.guild.roles.cache.find(r => r.name === roles[1])

        console.log(message.guild.id)

        if(AdminRole === undefined && MutedRole === undefined){ 
            for(let r = 0; r < roles.length; r++) {
                if(roles[r] === "Admin"){
                    message.guild.roles.create({
                        data:{
                            name:roles[r],
                            color:'YELLOW',
                            poition: 1,
                            hoist: true,
                            permissions:["ADMINISTRATOR"]
                        },
                        reason:"Adding Admin role for discord bot"
                    }).then(async role => {
                        await ServerConfig.findOneAndUpdate({_id:message.guild.id}, {AdminRole: role.name})
                    })
                    }
                if(roles[r] === "Muted") {
                    message.guild.roles.create({
                        data:{
                            name:roles[r],
                            color:'PURPLE'
                        },
                        reason:"Adding Muted role for discord bot"
                    })
                    .then(async role => {
                        await ServerConfig.findOneAndUpdate({_id:message.guild.id}, {MuteRole: role.name})
                    })
                }
            }
            message.reply(`i have Created the roles ${roles}`)
        }
        if(AdminRole === undefined && MutedRole){
            message.guild.roles.create({
                data:{
                    name:roles[0],
                    color:'YELLOW',
                    poition: 1,
                    hoist: true,
                    permissions:["ADMINISTRATOR"]
                },
                reason:"Adding Admin role for discord bot"
            })
            .then(async role => {
               await ServerConfig.findOneAndUpdate({_id:message.guild.id}, {AdminRole: role.name})
            })

            message.reply(`i have Created the roles ${roles[0]}.`)
        }
        if(MutedRole === undefined && AdminRole){

            message.guild.roles.create({
                data:{
                    name:roles[1],
                    color:'PURPLE'
                },
                reason:"Adding Muted role for discord bot"
            }).then(async role => {
                await ServerConfig.findOneAndUpdate({_id: message.guild.id}, {MuteRole: role.name})
            })

            message.reply(`i have Created the roles ${roles[1]}\nyou will need to add the deny permisons to the channels you want this person not to talk in`)
        }

    }
}