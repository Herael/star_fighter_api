var express = require('express');
var router = express.Router();

/* GET all ship */
router.get('/all', function(req, res, next) {
    res.status(200).send({
        error: null,
        spaceship: "yeahhhh buddy"
    });
});

module.exports = router;
