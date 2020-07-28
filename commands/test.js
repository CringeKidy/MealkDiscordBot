exports.run = (client, message, args) => {

    
    message.member.guild.channels.create('Server Stats', { reason: 'Making what the Server needs', type: 'category' })
        .then(channel => {
            message.member.guild.channels.create('Total Users: 0', { reason: 'Making what the Server needs', parent: channel.id, type: 'voice'}); 
            message.member.guild.channels.create('Users: 0', { reason: 'Making what the Server needs', parent: channel.id, type: 'voice'});
            message.member.guild.channels.create('Bots: 0', { reason: 'Making what the Server needs', parent: channel.id, type: 'voice'});
        })
        .then(() => rename())
    message.member.guild.channels.create('join-and-leave', {reason: 'Cause the bot needs it ', type: 'text'})
        .catch(console.error);
}   