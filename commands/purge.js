var Array = []
exports.run = (client, message, args) => {
   
    fs.readFile(`./Jsons/Server_Config/${message.guild.name} Server Config`, function(err, data){
    if (err) throw err;
    Array = JSON.parse(data);

    Config = Array.Modules.find(r => r.name === "Admin Rool")
     
    if(!message.member.roles.cache.some(r => r.name === Config)){
        message.channel.send("Sorry but your not an admin if you have a admin role do **!setconfig** and set the admin role");
    }
    else{
        
        let amount = args.join(" ");

        if(!amount) return message.channel.send("you need to say an ammount");

        if(Number(amount) > 100 || Number(amount) < 0){
            return message.channel.send('to high somewhere between 1-100 please or do !purge max');
        }
        if (amount === "max"){
            amount = 100;

            try{
                message.channel.bulkDelete(amount, true);
            }
            catch(e){
                console.error(e)
            }
        }
        else{
            try{
                message.channel.bulkDelete(amount, true);
            }
            catch(e){
                console.error(e)
            }
        }
    }
    });
}

module.exports.description = 'this lets admins purge messages in a channel'