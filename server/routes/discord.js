const router = require('express').Router();
const {getBotGuilds} = require('../utils/api.js');
const User = require('../database/schemas/user.js')
const {getMutalGuilds} = require('../utils/util.js')

router.get('/guilds', async (req, res) => {
    const guilds = await getBotGuilds()
    const user = await User.findOne({discordId: req.user.discordId})
   
    if(user){
        const userGuilds = user.get('guilds')
        const mutalGuilds = getMutalGuilds(userGuilds, guilds)
        res.send(mutalGuilds)
    }
    else{
        return res.status(401).send({msg: "Unaithorized"})
    }
})
module.exports = router; 