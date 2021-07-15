module.exports={
    "AdminCommand": true,
    "Description": "purge messages in a channel only 100 at a time tho. command gets exucted in the channel command was sent",
    "Format": "!purge <ammount>",
    "example":"!ping 99",
    execute(bot, message, args){

        const filter = m => m.author.id === message.author.id

        if(args.length > 0){
            const deleteNumber = args[0]
            
            if(!isNaN(deleteNumber)){
                if(deleteNumber > 99){
                    return message.reply('Sorry cant be over 100 message deleted at one time')
                }
                else{
                    message.channel.bulkDelete(deleteNumber, true)
                }
            }
            else{
                message.reply(`**${deleteNumber}** is not a number please provied a number`)
            }
        }
        else{
            message.channel.send('Ok how many items do you want to delete').then(() => {
                message.channel.awaitMessages(filter, {max: 1, time: 30000, errors:'time'})
                    .then(collected => {
                        const msgdelete = collected.first().content
    
                        if(msgdelete > 99){
                            return message.reply('Sorry cant be over 100 message deleted at one time')
                        }
                        if(isNaN(msgdelete)){
                            return message.reply(`**${msgdelete}** is not a number please provied a number`)
                        }
                        else{
                            message.channel.bulkDelete(msgdelete)
                        }
                    })
            })
        }
    }
}