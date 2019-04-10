var express = require('express');
var app = express();
var router = express.Router();
var deviceController = require('../Controller/userdeviceController');
var Joi = require('joi');

var creds = Joi.object().keys({
    device_id: Joi.number().empty().required(),
    token: Joi.number().empty().required(),
    language: Joi.number().empty().optional()
});


router.post('/adddevice', (req, res) => {
    Joi.validate(req.body, creds, function (err, val) {
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
            deviceController.add_device(req, res);
        }
    });
});


router.put('/deletedevice', (req, res) => {

    console.log('Here', req.body);
    deviceController.deleteDevice(req, res);
});

module.exports = router;