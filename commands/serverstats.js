exports.run = (client, message, args) => {

    if (!message.member.roles.cache.some(r => r.name === 'Admin')) {
        message.channel.send("Sorry but your not an admin");
    }
    else {
        if (!message.guild.channels.cache.find(r => r.name === 'Server Stats')) {
            message.guild.channels.create('Server Stats', { reason: 'Making what the Server needs', type: 'category' })
                .then(channel => {
                    message.guild.channels.create(`Total Users : ${message.guild.memberCount}`, { reason: 'Making what the Server needs', parent: channel.id, type: 'voice' })
                    message.guild.channels.create(`Users : ${message.guild.members.cache.filter(m => !m.user.bot).size}`, { reason: 'Making what the Server needs', parent: channel.id, type: 'voice' })
                    message.guild.channels.create(`Bots : ${message.guild.members.cache.filter(m => m.user.bot).size}`, { reason: 'Making what the Server needs', parent: channel.id, type: 'voice' })
                })
            message.guild.channels.create('join-and-leave', { reason: 'Cause the bot needs it ', type: 'text' })
                .catch(console.error);
        }
        else if (message.guild.channels.cache.find(r => r.name === 'Server Stats')) {
            message.channel.send('looks like everything is already here')
        }
    }


}

module.exports.description = 'this sets up server stats for the server'