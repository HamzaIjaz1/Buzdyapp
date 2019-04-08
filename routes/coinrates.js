var express = require('express');
var app = express();
var router = express.Router();
var ratesController = require('../Controller/coinrateController');

router.get('/', (request, response) => {
    console.log('Inside route of coin rates');
    ratesController.get_coins(request, response);
});

module.exports = router;