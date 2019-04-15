var express = require('express');
var app = express();
var router = express.Router();
var Joi = require('joi');
var bankController = require('../Controller/bankController');

var validate_id = Joi.object().keys({
    id: Joi.number().empty().required(),
    language: Joi.number().empty().optional()
});
var filters = Joi.object().keys({
    latitude: Joi.number().empty().optional(),
    longitude: Joi.number().empty().optional(),
    radius: Joi.number().empty().optional(),
    keyword: Joi.string().empty().optional(),
    page_no: Joi.number().empty().optional(),
    page_size: Joi.number().empty().optional(),
    country: Joi.string().empty().optional(),
    city: Joi.string().empty().optional(),
    language: Joi.number().empty().optional(),
    featured: Joi.boolean().empty().optional(),
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
            bankController.getbyID(req, res);
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
            bankController.getbyFilters(req, res);
        }
    });
});

module.exports = router;