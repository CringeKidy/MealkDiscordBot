const fs = require('fs');
const Discord = require('discord.js');
const Color = require('../Jsons/colors.json');
const { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require('constants');
const Path = './Jsons/Server_Config/'

exports.run = (client, message, args) => {

    if(message.channel.type === 'dm'){return console.log('no')};

    let servername = `${message.guild.name} Server Config`

    var Array = [];
    var objects = [];

    let ServerConfig;
 
    fs.readdir(Path, (err, files) => {
        if(!files.includes(servername)){
            let configsettings = {
                Modules : [{name : "Message on new Member", value : false}, {name : "Welcome Page", value : false}, {name : "Admin Tools", value : true}, {name : "Admin Rool", value : ""}]
            }
    
            let name = `${message.guild.name} Server Config`
            let data = JSON.stringify(configsettings);
            var path = './Jsons/Server_Config/';
            fs.writeFileSync(path + name, data);
        }
        else{
            fs.readFile(Path+servername, (err, data) => {
                if (err) throw err;
                Array = JSON.parse(data);

                for(i in Array.Modules){
                    objects.push(Array.Modules[i].name)
                }

                ServerConfig = Array.Modules.find(r => r.name === "Admin Rool").value

                console.log(message.guild.owner.user.username)

                if(!message.author.username === message.guild.owner.user.username || !message.member.roles.cache.some(r => r.name === ServerConfig)){
                    message.channel.send('sorry but your are not admin')
                }
                else{
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
                            let reply = item.trim().split(' ');
    
                            if(item.includes("Admin Rool")){
                                
                                let replyitem = item.slice(0, 10)
    
                                if(!reply[2]){
                                    return message.author.send(`please do Admin Rool (then name of your role ) \n**Admin Rool Admin**`);
                                }
    
                                Array.Modules.map(name => {
                                    if(name.name === replyitem){
                                        
                                        Array.Modules.find(r => r.name === replyitem).value = reply[2];
                                    
                                    fs.writeFileSync(Path+servername, JSON.stringify(Array));
                                    }
                                })
                                message.author.send(`the prammeter **${replyitem}** has been changed to **${Array.Modules.find(r => r.name === replyitem).value}**`)
                            }
                            else{
                                Array.Modules.map(name => {
                                    
                                    if(name.name === item){
    
                                        function toggleByName(name, object) {
                                            for (let obj of object.Modules) {
                                                if (obj.name == name) {
                                                obj.value = !obj.value;
                                                break;
                                            }
                                            }
                                        }
                            
                                        // Changes admin tools from true -> false
                                        toggleByName(item, Array);
                                        fs.writeFileSync(Path+servername, JSON.stringify(Array));
    
                                        message.author.send(`the prammeter **${item}** has been changed to **${Array.Modules.find(r => r.name === item).value}**`)
                                    }
                                })
                            }
                        })
                        .catch(e => {
                            console.log(e)
                        });
                    });   
                }
            });
        }            
    });   
}

module.exports.description = 'This is setting the Server Configuration EG Message when a member joins'