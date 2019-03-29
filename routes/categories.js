var express = require('express');
var router = express.Router();
var categoryController = require('../Controller/categoriesController');
var Joi = require('joi');

var inputs = Joi.object().keys({
  page_no: Joi.number().empty().optional(),
  page_size: Joi.number().empty().optional(),
  language: Joi.number().empty().optional(),
  country: Joi.number().empty().optional()
});

router.post('/', (request, response) => {
  Joi.validate(response.body, inputs, function (err, val) {
    if (err) {
      console.log(err);
      return response.send(
        JSON.stringify({
          status: 0,
          message: 'Invalid ' + err.details[0].path
        })
      );
    } else {
      categoryController.get_categories(request, response);
    }
  });
  console.log('inside categories.js');
});

router.get('/getmerchantscategories', (request, response) => {
  console.log('parameters of query are',request.query);
  Joi.validate(request.query, inputs, function (err, val) {
    if (err) {
      console.log('Error validating input inside getmerchant categories route',err);
      return response.send(
        JSON.stringify({
          status: 0,
          message: 'Invalid ' + err.details[0].path
        })
      );
    } else {
      console.log('inside getmerchant categories route');

      categoryController.get_merchant_categories(request, response);
    }
  });
  console.log('inside categories.js');
});
module.exports = router;