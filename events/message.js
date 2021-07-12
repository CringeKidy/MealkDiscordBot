const ServerConfig = require("../Schema/ServerConfigSchema.js")

module.exports = async (bot, message) => {


    // ignore all the bots
    if(message.author.bot) return;
    
    if(message.channel.type === 'dm'){
        message.author.send(`${message.author} sorry cant not take dm as of this time hopefully will be implamented soon`)
    }
    else{
        const Config = await ServerConfig.findOne({_id:message.guild.id})
        const prefix = Config.get('prefix')
        const AdminRole = Config.get('AdminRole')
        
    
        // Checks if the message has ! at the start of it
        if(!message.content.startsWith(prefix)) return;
    
        //Splits the message up from !pong to ! pong and then uses pong to find command
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
    
        // Then looks for command in bot.commands collection
        const cmd = bot.commands.get(command)
    
        // If the command dosent exit ingore the message
        if(!cmd) return;
    
        // if the Command exits run it with these parameters
        if(cmd.AdminCommand === true){
            /* if(AdminRole === null){
                message.author.send(`${message.author} There is no admin role set please configure me with !Serverconfig in the server`)
            }
            else{
                if(message.member.roles.cache.has(AdminRole)){
                    message.channel.send("has command");
                }
                else{
                    message.channel.send("Sorry you dont have the right role for this")
                }
            } */
            cmd.execute(bot, message, args,);
        }
        else{
            cmd.execute(bot, message, args,);
        }
    }


}