var express = require('express');
var app = express();
var router = express.Router();
var reviewController = require('../Controller/reviewController');
var Joi = require('joi');

var required =
  Joi.object().keys({
    reviewable_id: Joi.number().empty().required(),
    user_review: Joi.string().empty().required(),
    user_rating: Joi.number().empty().required(),
    reviewable_type: Joi.string().empty().required(),
    is_archive: Joi.boolean().empty().optional()
  });

var filters = Joi.object().keys({
  page_no: Joi.number().empty().optional(),
  page_size: Joi.number().empty().optional(),
  user_id: Joi.number().empty().optional(),
  type: Joi.string().empty().optional(),
  language: Joi.number().empty().optional()
});


router.post('/add', (req, res) => {
  Joi.validate(req.body, required, function (err, val) {
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
      reviewController.add(req, res);
    }
  });
});


router.get('/getreviews', (req, res) => {
  console.log('request params in getallmerchants are', req.query);
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
      reviewController.getreviews(req, res);
    }
  });
});
module.exports = router;