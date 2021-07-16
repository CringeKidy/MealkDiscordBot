module.exports={
    "AdminCommand": true,
    "Description": "this command allows admins to add roles to users",
    "Format": "!users",
    "example": "!users",
    execute(bot, message, args){
        message.channel.send("Test command was good")
        console.log(args)

    }
}