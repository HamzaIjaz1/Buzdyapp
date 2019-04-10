var express = require('express');
var app = express();
var router = express.Router();
var viewsController = require('../Controller/viewsController');
var Joi = require('joi');

var creds = Joi.object().keys({
    model_id: Joi.number().empty().required(),
    model_type: Joi.string().empty().required(),
    language: Joi.number().empty().optional()
});

var id=Joi.object().keys({
    id: Joi.number().empty().required()
})

router.put('/insertview', (req, res) => {
    Joi.validate(req.body, creds, function (err, val) {
        if (err) {
            console.log(err);
            return res.json(
                {
                    status: 0,
                    message: 'Invalid ' + err.details[0].path
                }
            );
        } else {
            console.log('Here', req.body);
            viewsController.insert_view(req, res);
        }
    });
});

router.get('/getviews', (req, res) => {
    Joi.validate(req.query, id, function (err, val) {
        if (err) {
            console.log(err);
            return res.json(
                {
                    status: 0,
                    message: 'Invalid ' + err.details[0].path
                }
            );
        } else {
            console.log('Here', req.body);
            viewsController.get_views(req, res);
        }
    });
});
module.exports = router;