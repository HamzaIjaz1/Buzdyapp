var review_model = require('../model/reviewModel');
var jwt = require('jsonwebtoken');
var config = require('../config');
var authHelper = require('../authHelper');
var language = require('../language');

var lan = 0;

module.exports.add = function (req, response) {

    // if (req.language != 'undefined') {
    //     lan = request.language;
    // }
    req.body.user_id = req.info;
    review_model.add(req.body).then(
        function (result) {
            return response.json(
                {
                    status: 1,
                    message: language.languages[0].success,
                }
            );

        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: 'Error adding a review'
            });
        }
    );

};