exports.run = (client, message, args) => {

    if(!message.member.roles.cache.some(r => r.name === 'Admin')){
        message.channel.send("Sorry but your not an admin");
    }
    else{
        const user = message.mentions.members.first();
        if(!user) return message.channel.send("you need to meintion someone");
        user.kick();
        message.channel.send(`** ${user} ** has been kicked`)  
    }

}

module.exports.description = 'this is a command that let admin kick users'

