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
    page_no: Joi.number().empty().optional(),
    page_size: Joi.number().empty().optional(),
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
    language: Joi.number().empty().optional(),
    isarchive: Joi.empty().optional()
  });

var creds = Joi.object().keys({
  email: Joi.string().email().min(11).required(),
  password: Joi.string().min(8).required(),
  language: Joi.number().empty().optional()
});

var validate_id = Joi.object().keys({
  id: Joi.number().empty().required(),
  language: Joi.number().empty().optional()

});

var filters = Joi.object().keys({
  latitude: Joi.number().empty().optional(),
  longitude: Joi.number().empty().optional(),
  radius: Joi.number().empty().optional(),
  merchant_featured: Joi.number().empty().optional(),
  keyword: Joi.string().empty().optional(),
  country: Joi.string().empty().optional(),
  city: Joi.string().empty().optional(),
  language: Joi.number().empty().optional(),
  from_time: Joi.string().regex(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/).empty().optional(),
  to_time: Joi.string().regex(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/).empty().optional()
});

var validate_merchant_id = Joi.object().keys({
  following_id: Joi.number().empty().required(),
  language: Joi.number().empty().optional()
});

var follow = Joi.object().keys({
  following_id: Joi.number().empty().required(),
  model_type: Joi.string().empty().required(),
  language: Joi.number().empty().optional()
});

var validate_coin = Joi.object().keys({
  number: Joi.number().empty().required(),
  language: Joi.number().empty().optional()
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

router.get('/getmerchant', (req, res) => {
  console.log('request params in get are', req.query);
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
      userController.getbyID(req, res);
    }
  });
});

router.get('/allmerchants', (req, res) => {
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
      userController.getall(req, res);
    }
  });
});

router.post('/follow', (req, res) => {
  Joi.validate(req.body, follow, function (err, val) {
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
      userController.follow_merchant(req, res);
    }
  });
});

router.delete('/unfollow', (req, res) => {
  Joi.validate(req.body, validate_merchant_id, function (err, val) {
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
      userController.unfollow_merchant(req, res);
    }
  });
});

router.put('/update', (req, res) => {
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
      userController.update(req, res);
    }
  });
});

router.put('/updatecoins', (req, res) => {
  Joi.validate(req.body, validate_coin, function (err, val) {
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
      userController.updateCoins(req, res);
    }
  });
});

router.get('/getcoins', (req, res) => {
      userController.getCoins(req, res);
   
});

router.get('/getfollowing', (req, res) => {
  console.log('request params in get are', req.info);
  userController.getfollowing(req, res);
});

router.get('/getfollowers', (req, res) => {
  console.log('request params in get are', req.info);
  userController.getfollowers(req, res);
});

module.exports = router;