exports.run = (client, message, args) => {

    if (!message.member.roles.cache.some(r => r.name === 'Admin')) {
        message.channel.send("Sorry but your not an admin");
    }
    else {

        client.emit('guildMemberAdd', message.member)
    }

}

module.exports.description = 'this emits someone joing the server'