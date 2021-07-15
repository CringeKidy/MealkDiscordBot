const ServerConfig = require("../Schema/ServerConfigSchema.js");

module.exports={
    "AdminCommand": true,
    "Description": "this lets admins ban users with a command",
    "Format": "!ban @<user> (optional)<days> (optional)<reason>",
    "example": "!ban @CringeKidy 2 Cause he stinks",
    async execute(bot, message, args){
        const Config = await ServerConfig.findOne({_id:message.guild.id})
        const AdminRole = Config.get('AdminRole')
        const [first,second, ...remaning] = args;
        const joinremans = remaning.join(' ')

        const user_id = first.replace("<", "").replace("@", "").replace(">","").replace("!", '')
        let member = message.guild.member(user_id)

        if(first.toLowerCase().includes('help')){
            return message.reply('This command format is !ban @<user> (optional)<days> (optional)<reason>.\n has to be in that order tho so if you want to say reason you have to specify days banned ');
        }

        if(member === null)return message.reply('User does not exits');

        if(member.user.username === bot.user.username) return message.reply('cant ban me');

        if(member.roles.cache.find(r => r.name === AdminRole)) return message.reply('cant ban admin');  

        if(args.length > 0){
            if(joinremans != null){
                member.ban({days: second, reason:joinremans})
            }
            if(second != null){
                member.ban({days: second, reason:"No reason given"})
            }else{
                member.ban({reason:"No reason given"})
            }
        }        
        else{
            message.reply('you did mention anyone.\nThis command format is !ban @<user> (optional)<days> (optional)<reason>')
        }
    }
}