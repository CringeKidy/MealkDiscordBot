const router = require('express').Router();
const passport = require('passport');

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/redirect', passport.authenticate('discord'), (res, req) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})




module.exports = router; 