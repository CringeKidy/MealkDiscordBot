const fetch = require('node-fetch');
require('dotenv').config();

async function getBotGuilds(){
    const response = await fetch('http://discord.com/api/v6/users/@me/guilds', {
        method: 'GET',
        headers:{
            Authorization: `Bot ${process.env.BOT_TOKEN}`
        }
    })
    return response.json()
}

module.exports = {getBotGuilds}
