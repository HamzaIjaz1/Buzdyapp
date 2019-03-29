var express = require('express');
var app = express();
var router = express.Router();
var userController = require('../Controller/userController');
var Joi = require('joi');

var required =
  Joi.object().keys({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(11).required(),
    category_id: Joi.number().empty().required(),
    password: Joi.string().min(8).required(),
    image: Joi.empty().optional(),
    phone: Joi.number().empty().optional(),
    country: Joi.string().empty().optional(),
    description: Joi.string().empty().optional(),
    phone_country_code: Joi.empty().optional(),
    address: Joi.string().empty().optional(),
    city: Joi.string().empty().optional(),
    latitude: Joi.string().empty().optional(),
    longitude: Joi.string().empty().optional(),
    featured: Joi.empty().optional(),
    feature_expiry: Joi.empty().optional(),
    isarchive: Joi.empty().optional(),
  });

var creds = Joi.object().keys({
  email: Joi.string().email().min(11).required(),
  password: Joi.string().min(8).required(),
  language: Joi.empty().optional()
});

var validate_id = Joi.object().keys({
id: Joi.number().empty().required()
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res) => {
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
      userController.signup_user(req, res);
    }
  });
});


router.post('/signin', (req, res) => {
  Joi.validate(req.body, creds, function (err, val) {
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
      userController.signin_user(req, res);
    }
  });
});

router.get('/getmerchant/:id', (req, res) => {
  console.log('request params in get are', req.params);
  Joi.validate(req.params, validate_id, function (err, val) {
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
      userController.getbyID(req, res);
    }
  });
});

module.exports = router;