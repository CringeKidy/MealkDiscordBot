const fs = require('fs');
const Discord = require('discord.js');


exports.run = (client, message, args) => {

    if(message.channel.type === 'dm'){return console.log('no')};

    let servername = `${message.guild.name} Server Config`

    var array = [];

    if(!message.member.roles.cache.some(r => r.name === 'Admin') || !message.guild.owner){
        message.channel.send('sorry but your are not admin')
    }
    else{
        fs.readdir('./Jsons/Server_Config/', (err, files) => {
            if(!files.includes(servername)){
                let configsettings = {
                    message_on_new_member : false,
                    welcome_page : false,
                    admin_tools: true,
                    items : ['Message on new Member', 'Welcome Page']
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

                    message.author.send(`ok what do you want to set here is a list of things **${array.items}**`)
                    .then(function(){
                        message.author.dmChannel.awaitMessages(response => message.content, {
                        max: 1,
                        time: 300000000,
                        errors: ['time'],
                        })
                        .then(collected => {    
                            console.log();
                            let item = collected.first().content;

                            if(!array.items.includes(item)){
                              return message.author.send(`Sorry that is not a command here is a list of commands **${array.keys}**`);
                            }
                            
                            console.log(array);

                            let input = array.includes(item);

                            console.log(input)

                        })
                        .catch(e => {
                            console.log(e)
                        });
                    });
                });
            }            
        });   
    }
}

module.exports.description = 'th'