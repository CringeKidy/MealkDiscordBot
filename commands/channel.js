module.exports={
    "AdminCommand": false,
    execute(bot, message, args){
        let channel_id = args[0].replace('<','').replace('>','').replace('#','')
        
        console.log(channel_id)
        let channel = message.guild.channels.cache.get(channel_id).name 

        message.channel.send(channel)

    }
}