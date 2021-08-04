const passport = require('passport')
const router = require('express').Router();

const redirect = process.env.redirectURL || "http://localhost:3001"

router.use('/discord', passport.authenticate('discord'));

router.use('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: "/"
}), function(req, res){
    res.redirect(redirect+'/menu')
})

module.exports = router