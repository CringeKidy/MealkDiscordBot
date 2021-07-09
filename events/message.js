module.exports = (bot, message) => {
    // ignore all the bots
    if(message.author.bot) return;

    // Checks if the message has ! at the start of it
    if(!message.content.startsWith(bot.config.prefix)) return;

    //Splits the message up from !pong to ! pong and then uses pong to find command
    const args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Then looks for command in bot.commands collection
    const cmd = bot.commands.get(command)

    // If the command dosent exit ingore the message
    if(!cmd) return;

    // if the Command exits run it with these parameters
    cmd.run(bot, message, args)

}