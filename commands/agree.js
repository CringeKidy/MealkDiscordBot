exports.run = (client, message, args) => {
    
    //to see if a message was sent in the welcome channel and if so add the role 'Member' to the user and delete all messages that are unpinned
    if(message.channel.name == "welcome"){
            
        const role = message.guild.roles.cache.find(role => role.name === 'Member');

        if(!message.member.roles.cache.some(role => role.name === 'Member')){
            message.member.roles.add(role);
        }
        agree();
    }

    //Delete Function
    async function agree(){
        const allMessages = await message.channel.messages.fetch()
        const deletable = allMessages.filter(message => !message.pinned)
        await message.channel.bulkDelete(deletable, true)
    }
}

module.exports.description = 'this a authintaction thing like siging into a account just without the password'