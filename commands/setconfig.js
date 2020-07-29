const fs = require('fs');
const Discord = require('discord.js');


exports.run = (client, message, args) => {

    let servername = `${message.guild.name} Server Config`
    console.log(servername);

    var array = [];

    if(!message.member.roles.cache.some(r => r.name === 'Admin') || !message.guild.owner){
        message.channel.send('sorry but your are not admin')
    }
    else{
        fs.readdir('./Jsons/Server_Config/', (err, files) => {
            if(!files.includes(servername)){
                let configsettings = {
                    message_on_new_member : false,
                    items : ['message on new member']
                }
            
                    let name = `${message.guild.name} Server Config`
                    let data = JSON.stringify(configsettings);
                    var path = './Jsons/Server_Config/';
                    fs.writeFileSync(path + name, data);
            }
            else{
                fs.readFile(`./Jsons/Server_Config/${servername}`, (err, data) => {
                    if (err) throw err;
                    array = JSON.parse(data);
                    console.log(array.items);

                    message.author.send(`ok what do you want to set here is a list of things **${array.items}**`)
                    const collector = new Discord.MessageCollector(message.author, {time: 10000 });
                    collector.on('collect', message => {
                        if(message.content != array.items){
                            console.log('no')
                        }

                    })

                    
                });
            }            
        });   
    }


}

module.exports.description = 'this is to set the server settings like do they want a welcome message or do they want a message when someone joins etc'