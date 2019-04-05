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

  module.exports = router;