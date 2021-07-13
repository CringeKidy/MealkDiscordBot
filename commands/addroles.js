const ServerConfig = require("../Schema/ServerConfigSchema.js");
module.exports={
    "AdminCommand": false,
    execute(bot, message, args){
        const roles = ["Admin", "Muted"];
        const AdminRole = message.guild.roles.cache.find(r => r.name === roles[0]) 
        const MutedRole = message.guild.roles.cache.find(r => r.name === roles[1])

        if(AdminRole === undefined && MutedRole === undefined){ 
            for(let r = 0; r < roles.length; r++) {
                if(roles[r] === "Admin"){
                    message.guild.roles.create({
                        data:{
                            name:roles[r],
                            color:'YELLOW',
                            permissions:["ADMINISTRATOR"]
                        },
                        reason:"Adding Admin role for discord bot"
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
                }
            }
            message.reply(`i have Created the roles ${roles}`)
        }
        if(AdminRole === undefined && MutedRole){
            message.guild.roles.create({
                data:{
                    name:roles[0],
                    color:'YELLOW',
                    permissions:["ADMINISTRATOR"]
                },
                reason:"Adding Admin role for discord bot"
            })

            message.reply(`i have Created the roles ${roles[0]}`)
        }
        if(MutedRole === undefined && AdminRole){
            message.guild.roles.create({
                data:{
                    name:roles[1],
                    color:'PURPLE'
                },
                reason:"Adding Muted role for discord bot"
            })

            message.reply(`i have Created the roles ${roles[1]}`)
        }

    }
}