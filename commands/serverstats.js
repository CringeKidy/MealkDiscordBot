exports.run = (client, message, args) => {

    if(!message.member.roles.cache.some(r => r.name === 'Admin')){
        message.channel.send("Sorry but your not an admin");
    }
    else{
        if(!message.guild.channels.cache.find(r => r.name === 'Server Stats')){
            guild.channels.create('Server Stats', { reason: 'Making what the Server needs', type: 'category' })
            .then(channel => {
              guild.channels.create('Total Users: 0', { reason: 'Making what the Server needs', parent: channel.id, type: 'voice'}) 
              guild.channels.create('Users: 0', { reason: 'Making what the Server needs', parent: channel.id, type: 'voice'})
              guild.channels.create('Bots: 0', { reason: 'Making what the Server needs', parent: channel.id, type: 'voice'})
            })
            guild.channels.create('join-and-leave', {reason: 'Cause the bot needs it ', type: 'text'})
            .catch(console.error);
          }
        if(message.guild.channels.cache.find(r => r.name === 'Server Stats')){
            message.channel.send('looks like everything is already here')
        }
    }


}

module.exports.description = 'this sets up server stats for the server'