var express = require('express');
var app = express();
var router = express.Router();
var notifyController = require('../Controller/notificationsController');
var Joi = require('joi');

var validate_id = Joi.object().keys({
  data: Joi.number().empty().required(),
  language: Joi.number().empty().optional()
});


router.get('/get/', (req, res) => {
  console.log('request params in get are', req.info);
  notifyController.getUserNotifications(req, res);

});

module.exports = router;