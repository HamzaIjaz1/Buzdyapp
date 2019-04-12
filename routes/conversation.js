var express = require('express');
var app = express();
var router = express.Router();
var conversationController = require('../Controller/conversationController');
var Joi = require('joi');

var creds = Joi.object().keys({
    user2: Joi.number().empty().required(),
    message: Joi.string().empty().required(),
    language: Joi.number().empty().optional()
});

var input_id = Joi.object().keys({
    user2: Joi.number().empty().required(),
    language: Joi.number().empty().optional()
});

router.post('/send', (req, res) => {
    Joi.validate(req.body, creds, function (err, val) {
        if (err) {
            console.log(err);
            return res.json({
                status: 0,
                message: 'Invalid ' + err.details[0].path
            });
        } else {
            console.log('Here', req.body);
            conversationController.insert_conversation(req, res);
        }
    });
});

router.get('/getall', (req, res) => {
    conversationController.getall_conversations(req, res);
});

router.get('/getbyId', (req, res) => {
    Joi.validate(req.query, input_id, function (err, val) {
        if (err) {
            console.log(err);
            return res.json({
                status: 0,
                message: 'Invalid ' + err.details[0].path
            });
        } else {
            console.log('Here', req.body);
            conversationController.getbyId(req, res);
        }
    });
});
module.exports = router;