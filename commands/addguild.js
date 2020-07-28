exports.run = (client, message, args) => {
    
    if(!message.member.roles.cache.some(r => r.name === 'Admin')){
        message.channel.send("Sorry but your not an admin");
    }
    else{
        client.emit('guildCreate')
    }


}

module.exports.description = 'this emits the bot joining the server'