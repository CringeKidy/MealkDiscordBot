const config = require('../package.json')

exports.run = (client, message, args) => {
    
    message.channel.send(config.homepage)

}