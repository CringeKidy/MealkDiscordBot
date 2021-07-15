const ServerConfig = require("../Schema/ServerConfigSchema.js");

module.exports={
    "AdminCommand": true,
    "Description": "this lets admins kick users with a command",
    "Format": "!kick @<user> (optional)<reason>",
    "example":"!kick @CringeKidy Cause he stinks",
    async execute(bot, message, args){
        const Config = await ServerConfig.findOne({_id:message.guild.id})
        const AdminRole = Config.get('AdminRole')
        const [first, ...remaning] = args;
        const joinremans = remaning.join(' ')

        if(!first){
            return message.reply('Please mention someone')
        }

        const user_id = first.replace("<", "").replace("@", "").replace(">","").replace("!", '')
        let member = message.guild.member(user_id)

        if(member === null)return message.reply('User does not exits');

        if(member.user.username === bot.user.username) return message.reply('cant kick me');

        if(member.roles.cache.find(r => r.name === AdminRole)) return message.reply('cant kick admin');  

        if(args.length > 0){
            if(args[1] != null){
                member.kick(joinremans)
            }else{
                member.kick("No reason given")
            }
        }        
        else{
            message.reply('you did mention anyone.\nThis command format is !kick @<user> (optinal)<reason>.')
        }
    }
}