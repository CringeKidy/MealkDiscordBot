module.exports={
    "AdminCommand": true,
    "Description": "just a test command",
    "Format": "!test",
    "example": "!test",
    execute(bot, message, args){
        message.channel.send("Test command was good")



    }
}