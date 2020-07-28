exports.run = (client, message, args) => {
    
    if(!message.member.roles.cache.some(r => r.name === 'Admin')){
        message.channel.send("Sorry but your not an admin");
    }
    else{
        try{
        const warnuser = message.mentions.members.first();
        if(!warnuser) return message.channel.send("you need to menition someone")
    
        let warnreason = args.slice(1).join(" ");
        
        let warnedUser
        warnedUser = client.getUser.get(warnuser.user.username);
        
        if(!warnedUser){
            warnedUser = { id: warnedUser.username, user: warnedUser.username, BANS: 0, Warns : 0, warn_reason: "", commands: 0}
        }
        
        warnedUser.Warns++;
        warnedUser.warn_reason = warnreason;
    
        if(warnedUser.Warns === 3){
        warnedUser.Warns = 0;
        warnuser.kick("has had three warnings");
        message.channel.send(`${warnuser} has been banned because they have been warned 3 times`)
        }
        else if(warnedUser.Warns === 2){
            warnuser.send("if you get one more warning you are getting kicked");
            message.channel.send("user has been warned");
        }
        else{
            message.channel.send("user has been warned");
        }
    
        client.setUser.run(warnedUser);
    
        }
        catch(e){
            console.error(e)
        }
    }
    


}

module.exports.description = 'this lets admins warn users'
