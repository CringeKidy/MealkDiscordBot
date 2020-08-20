const fs = require('fs')

exports.run = (client, message, args) => {
    var Array = [];

    fs.readFile(`./Jsons/Server_Config/${message.guild.name} Server Config`, function(err, data){
        if (err) throw err;
        Array = JSON.parse(data);

        const role = message.guild.roles.cache.get(Array.Modules.find(r => r.name === "Member Role").value);

        if(!message.member.roles.cache.get(Array.Modules.find(r => r.name === "Member Role").value)){
            message.member.roles.add(role);
        }
    })

}   