var express = require('express');
var app = express();
var router = express.Router();
var metadataController = require('../Controller/coins_metadataController');

router.get('/', (request, response) => {
    console.log('Inside route');
    metadataController.get_metadata(request, response);
});

module.exports = router;