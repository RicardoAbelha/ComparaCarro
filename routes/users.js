var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/teste', function(reg, res, next) {
    res.send('esse é o caminho');
});

module.exports = router;