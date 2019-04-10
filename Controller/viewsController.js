var views_model = require('../model/viewsModel');
var authHelper = require('../authHelper');
var language = require('../language');
var lan = 0;


module.exports.insert_view = function (request, response) {
    // console.log('This is the request object',request);
    console.log('This is request data', request.info);
    if (request.body.language != 'undefined') {
        lan = request.language;
    }
    views_model.insert_views_model(request.body).then(
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

module.exports.get_views = function (request, response) {
    console.log('This is request data', request.query);
    if (request.body.language != 'undefined') {
        lan = request.language;
    }
    
    views_model.get_views_model(request.query).then(
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
                message: 'Error updating profile'
            });
        }
    );

};