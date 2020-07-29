exports.run = (client, message, args) => {
   
    if(!message.member.roles.cache.some(r => r.name === 'Admin')){
        message.channel.send("Sorry but your not an admin");
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

}

module.exports.description = 'this lets admins purge messages in a channel'