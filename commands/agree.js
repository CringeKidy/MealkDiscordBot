const fs = require('fs')
exports.run = (client, message, args) => {
    var Array = [];

    fs.readFile(`./Jsons/Server_Config/${message.guild.name} Server Config`, function(err, data){
        if (err) throw err;
        Array = JSON.parse(data);
    
        let ServerConfig = Array.Modules.find(r => r.name === "Welcome Page Channel").value;

        if(ServerConfig == ""){
            return message.guild.owner.send("I have lost the Welcome Page Channel please do !setconfig and give me the name of Channel")
        }

        let MemberRole = Array.Modules.find(r => r.name === "Member Role").value

        if(MemberRole == ""){
            return message.guild.owner.send("I have lost the Member Role please do !setconfig and give me the name of Role you have for members")
        }


        let ChannelName = message.guild.channels.cache.get(ServerConfig).name;

        //to see if a message was sent in the welcome channel and if so add the role 'Member' to the user and delete all messages that are unpinned
        if(message.channel.name == ChannelName){
                
            const role = message.guild.roles.cache.get(MemberRole);

            if(!message.member.roles.cache.get(MemberRole)){
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
    })
}

module.exports.description = 'this a authintaction thing like siging into a account just without the password'