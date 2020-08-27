const { prefix } = require('../Jsons/config.json');

exports.run = (client, message, args) => {

    const data = [];
    let keys = Array.from(client.commands.keys());
    let member = message.mentions.users.first();


    data.push('Here\'s a list of all my commands:');
    console.log(keys)
    data.push(`***${keys}***`);

    if (member) {
        return member.send(data, { split: true })
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.channel.send(`${member}, I\'ve sent you a DM with all my commands!`);
            })
            .catch(error => {
                console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                message.reply('it seems like I can\'t DM you!');
            });
    }
    else {
        return message.author.send(data, { split: true })
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('I\'ve sent you a DM with all my commands!');
            })
            .catch(error => {
                console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                message.reply('it seems like I can\'t DM you!');
            });
    }
}

module.exports.description = 'this is a list of all of the command that the bot has'