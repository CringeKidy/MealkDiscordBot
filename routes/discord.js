const router = require('express').Router();

router.use('/', (req, res) => {
    res.send(200)
})

module.exports = router