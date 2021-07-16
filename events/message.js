const ServerConfig = require("../Schema/ServerConfigSchema.js")


module.exports = async (bot, message) => {
    // ignore all the bots
    if(message.author.bot) return;
    
    if(message.channel.type === 'dm'){
        message.author.send(`${message.author} sorry cant not take dm as of this time hopefully will be implamented soon`)
    }
    else{
        const Config = await ServerConfig.findOne({_id:message.guild.id})
        let prefix;
        let AdminRole;
        try{
            prefix = Config.get('prefix')
            AdminRole = Config.get('AdminRole');
        } 
        catch{
            ServerConfig.create({
                _id: message.guild.id,
                MemberCount: message.guild.memberCount
            });
            return message.channel.send("Your setting were rest due to an error our part please do !serverconfig to reset them")
        }
        
        if(!message.content.startsWith(prefix)) return;

        //Splits the message up from !pong to ! pong and then uses pong to find command
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
    
        // Then looks for command in bot.commands collection
        const cmd = bot.commands.get(command);
        
        if(!cmd) return;

        // if the Command exits run it with these parameters
        if(cmd.AdminCommand === true){
            if(message.author.id === message.guild.owner.id){
                cmd.execute(bot, message, args);
            }
            if(AdminRole === null){
                message.author.send(`${message.author} There is no admin role set please configure me with !Serverconfig in the server`)
            }
            else{
                if(message.member.roles.cache.has(AdminRole)){
                    return cmd.execute(bot, message, args);
                }
                if(message.author.id != message.guild.owner.id){
                    return message.reply("Sorry you dont have the role to use this command")
                }
            }
        }
        else{
            cmd.execute(bot, message, args);
        }

    }
}