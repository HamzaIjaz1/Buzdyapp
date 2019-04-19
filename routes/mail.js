var express = require('express');
var router = express.Router();
var helper = require('../mailHelper');
var handle_reset = (require('../Controller/resetController'));
var Joi = require('joi');

var token = Joi.object().keys({
    language: Joi.string().empty().optional(),
    user_id: Joi.number().empty().required(),
    email: Joi.string().email().empty().required(),
    subject: Joi.string().empty().required(),
    text: Joi.string().empty().required(),
    username: Joi.string().empty().required()
});

var mail = '';
router.post('/', function (req, res, next) {
    console.log('inside index.js');
    Joi.validate(req.body, token, function (err, val) {
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
            handle_reset.generate_token(req, res);
        }
    });
    
});



module.exports = router;