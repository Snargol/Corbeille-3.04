var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json({infos: 'secure ressources', _id: req.app.get("userId")});
})

module.exports = router;
