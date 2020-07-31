const fs = require('fs');
const Discord = require('discord.js');
const Color = require('../Jsons/colors.json')


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
                    Modules : [{name : "Message on new Member", value : false}, {name : "Welcome Page", value : false}, {name : "Admin Tools", value : true}]
                }
        
                let name = `${message.guild.name} Server Config`
                let data = JSON.stringify(configsettings);
                var path = './Jsons/Server_Config/';
                fs.writeFileSync(path + name, data);

                message.channel.send('Sorry there was no Config file for this serever please do !setconfig again')
            }
            else{
                fs.readFile(`./Jsons/Server_Config/${servername}`, (err, data) => {
                    if (err) throw err;
                    array = JSON.parse(data);

                    var objects = [];

                    for(i in array.Modules){
                        objects.push(array.Modules[i].name && array.Modules[i].value)
                    }
                    
                    console.log(objects)

                    message.author.send(new Discord.MessageEmbed()
                    .setTitle('Server Config')
                    .addField('Command list',`${objects}`)
                    .addField("Please type the command excalty its **Case Sensitive**", '\n\u200b')
                    .setColor(Color.Orange)
                    .setFooter(`Created by ${client.user.tag}`, client.user.displayAvatarURL())
                    )
                    .then(function(){
                        message.author.dmChannel.awaitMessages(response => message.content, {
                        max: 1,
                        time: 300000000,
                        errors: ['time'],
                        })
                        .then(collected => {    
                            let item = collected.first().content;

                            if(!objects.includes(item)){
                              return message.author.send(`Sorry that is not a command here is a list of commands **${objects}**`);
                            }
                            
                            if(objects.includes(item)){
                                console.log('yes')
                            }

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

module.exports.description = 'This is setting the Server Configuration EG Message when a member joins'