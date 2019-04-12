var express = require('express');
var app = express();
var router = express.Router();
var likesController = require('../Controller/likesController');
var Joi = require('joi');

var creds = Joi.object().keys({
    model_id: Joi.number().empty().required(),
    model_type: Joi.string().empty().required(),
    language: Joi.number().empty().optional()
});

var filters = Joi.object().keys({
    user_id: Joi.number().empty().optional(),
    model_id: Joi.number().empty().optional(),
    model_type: Joi.string().empty().optional(),
    language: Joi.number().empty().optional()

});

router.put('/insertlike', (req, res) => {
    Joi.validate(req.body, creds, function (err, val) {
        if (err) {
            console.log(err);
            return res.json({
                status: 0,
                message: 'Invalid ' + err.details[0].path
            });
        } else {
            console.log('Here', req.body);
            likesController.insert_like(req, res);
        }
    });
});

router.get('/getlikes', (req, res) => {
    Joi.validate(req.query, filters, function (err, val) {
        if (err) {
            console.log(err);
            return res.json({
                status: 0,
                message: 'Invalid ' + err.details[0].path
            });
        } else {
            console.log('Here', req.query);
            likesController.get_likes(req, res);
        }
    });
});
module.exports = router;