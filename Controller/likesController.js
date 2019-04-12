var likes_model = require('../model/likesModel');
var authHelper = require('../authHelper');
var language = require('../language');
var lan = 0;


module.exports.insert_like = function (request, response) {
    console.log('This is request data', request.info);
    request.body.user_id=request.info;
    if (request.body.language != 'undefined') {
        lan = request.language;
    }
    likes_model.insert_likes_model(request.body).then(
        function (result) {
            console.log('result received is', result);
            return response.json({
                status: 1,
                message: language.languages[0].success
            });

        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: 'Error updating profile'
            });
        }
    );

};

module.exports.get_likes = function (request, response) {
    console.log('This is request data', request.query);
    if (typeof request.query.language !== 'undefined') {
        lan = request.query.language;
    }
    
    likes_model.get_likes_model(request.query).then(
        function (result) {
            console.log('result received is', result);
            return response.json({
                status: 1,
                message: language.languages[0].success,
                views: result
            });

        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: 'Error getting likes'
            });
        }
    );

};