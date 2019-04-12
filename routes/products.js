var express = require('express');
var app = express();
var router = express.Router();
var Joi = require('joi');
var productsController = require('../Controller/productController');

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
var values = Joi.object().keys({
  name: Joi.string().empty().required(),
  description: Joi.string().empty().required(),
  image: Joi.string().empty().optional(),
  productable_type: Joi.string().empty().required(),
  category_id: Joi.number().empty().required(),
  featured: Joi.boolean().empty().required(),
  language: Joi.number().empty().optional()

});

var req_array = Joi.object().keys({
  ids: Joi.empty().required(),
  language: Joi.number().empty().optional()
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
      productsController.getbyID(req, res);
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
      productsController.getbyFilters(req, res);
    }
  });
});

router.post('/add', (req, res) => {
  Joi.validate(req.body, values, function (err, val) {
    if (err) {
      console.log(err);
      return res.send(
        JSON.stringify({
          status: 0,
          message: 'Invalid ' + err.details[0].path
        })
      );
    } else {
      console.log('Here', req.body);
      productsController.addProduct(req, res);
    }
  });
});

router.get('/compare', (req, res) => {
  Joi.validate(req.query, req_array, function (err, val) {
    if (err) {
      console.log('error in values', err);

      return res.send(JSON.stringify({
        status: 0,
        message: 'Invaid' + err.details[0].path
      }));
    } else {
      console.log('values are', req.query);
      productsController.compare(req, res);
    }
  });
});
module.exports = router;