const ServerConfig = require("../Schema/ServerConfigSchema.js");
const Colors = require("../Jsons/colors.json");

module.exports={
    "AdminCommand": true,
    "Description": "this command allows admins to add roles to users",
    "Format": "!users",
    "example": "!users",
    execute(bot, message, args){
        const cmd = bot.commands.get(args[0])
        const keys = Array.from(bot.commandName.keys()).join(", ");

        const commandsEmbed = {
            title:"Commands",
            description: "This is all the commands i have",
            color: Colors.Blue,
            fields:[
                {
                    name:"Commands",
                    value: keys
                },
                {
                    name:"use one of these in !help",
                    value: "for example **!help serverconfig**"
                },
            ],
            timestamp: new Date(),
            footer:{
                text:`Created by ${bot.user.tag}`,
                icon_url: bot.user.displayAvatarURL()
            }
        }

        if(!cmd) return message.reply({embed: commandsEmbed})
        
        const helpEmbed = {
            title:"Command help",
            description: "This is to help you understand a command",
            color: Colors.Green,
            fields:[
                {
                    name:"Command name",
                    value: args[0],
                    inline: true
                },
                {
                    name:"Description",
                    value: cmd.Description,
                    inline: true
                },
                {
                    name:"Format",
                    value: cmd.Format
                    
                },
                {
                    name:"Example",
                    value: cmd.example
                }
            ],
            timestamp: new Date(),
            footer:{
                text:`Created by ${bot.user.tag}`,
                icon_url: bot.user.displayAvatarURL()
            }
        }

        if(cmd){
            message.channel.send({embed: helpEmbed})
        }


    }
}