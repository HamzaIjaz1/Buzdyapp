var express = require('express');
var app = express();
var router = express.Router();
var viewsController = require('../Controller/viewsController');
var Joi = require('joi');

var creds = Joi.object().keys({
    user_id: Joi.number().empty().required(),
    model_id: Joi.number().empty().required(),
    model_type: Joi.string().empty().required(),
    language: Joi.number().empty().optional()
});

var filters = Joi.object().keys({
    user_id: Joi.number().empty().optional(),
    model_id: Joi.number().empty().optional(),
    model_type: Joi.string().empty().optional()
});

router.put('/insertview', (req, res) => {
    Joi.validate(req.body, creds, function (err, val) {
        if (err) {
            console.log(err);
            return res.json({
                status: 0,
                message: 'Invalid ' + err.details[0].path
            });
        } else {
            console.log('Here', req.body);
            viewsController.insert_view(req, res);
        }
    });
});

router.get('/getviews', (req, res) => {
    Joi.validate(req.query, filters, function (err, val) {
        if (err) {
            console.log(err);
            return res.json({
                status: 0,
                message: 'Invalid ' + err.details[0].path
            });
        } else {
            console.log('Here', req.query);
            viewsController.get_views(req, res);
        }
    });
});
module.exports = router;