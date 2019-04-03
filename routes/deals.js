var express = require('express');
var app = express();
var router = express.Router();
var Joi = require('joi');
var dealController = require('../Controller/dealContoller');

var validate_id = Joi.object().keys({
  id: Joi.number().empty().required()
});
var filters = Joi.object().keys({
  latitude: Joi.number().empty().optional(),
  longitude: Joi.number().empty().optional(),
  radius: Joi.number().empty().optional(),
  merchant_id: Joi.number().empty().optional(),
  keyword: Joi.string().empty().optional(),
  country: Joi.string().empty().optional(),
  city: Joi.string().empty().optional(),
  language: Joi.number().empty().optional(),
  page_no: Joi.number().empty().optional(),
  page_size: Joi.number().empty().optional(),
  fav: Joi.number().empty().optional()
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

router.get('/getbyfilters', (req, res) => {
  Joi.validate(req.query, filters, function (err, val) {
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
      dealController.getbyFilters(req, res);
    }
  });
});

module.exports = router;