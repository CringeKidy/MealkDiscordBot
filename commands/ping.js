module.exports={
    "AdminCommand": false,
    "Description": "test the server connection",
    "Format": "!ping",
    "example":"!ping",
    execute(bot, message, args){
        message.channel.send("Pong!")
    }
}