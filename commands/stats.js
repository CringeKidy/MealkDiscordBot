exports.run = (client, message, args) => {
    message.channel.send(`Server count: ${client.guilds.cache.size}`);
}

module.exports.description = 'this is how many servers the bot is in'