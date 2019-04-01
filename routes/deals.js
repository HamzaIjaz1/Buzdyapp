var express = require('express');
var app = express();
var router = express.Router();
var Joi = require('joi');
var dealController = require('../Controller/dealContoller');

var validate_id = Joi.object().keys({
    id: Joi.number().empty().required()
  });

router.get('/getbyid', (req, res) => {
    Joi.validate(req.query, validate_id, function (err, val) {
      if (err) {
        console.log("error is", err.details[0].path);
  
        return res.send(
          JSON.stringify({
            status: 0,
            message: 'Invalid ' + err.details[0].path
          })
        );
      } else {
        console.log('input alright');
        dealController.getbyID(req, res);
      }
    });
  });
  module.exports = router;