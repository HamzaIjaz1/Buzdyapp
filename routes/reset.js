var express = require('express');
var router = express.Router();
var handle_reset = (require('../Controller/resetController'));
var Joi = require('joi');

var token = Joi.object().keys({
    token: Joi.number().empty().required(),
    language: Joi.string().empty().optional()
});
router.get('/', (req, res) => {
    console.log('Here', req.query);

    Joi.validate(req.query, token, function (err, val) {
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
            handle_reset.handle_reset(req, res);
        }
    });

});

module.exports=router;