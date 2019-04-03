var deal_model = require('../model/dealModel');
var authHelper = require('../authHelper');
var language = require('../language');

var lan = 0;

module.exports.getbyID = function (request, response) {
    if (request.query.language) {
        lan = request.query.language;
    }
    deal_model.getbyID_model(request.query.id).then(
        function (deal) {
            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[lan].success,
                    deal: deal
                })
            );

        },
        function (error) {
            console.log('Error while getting merchants by id', error);
            return response.send(
                JSON.stringify({
                    status: 0,
                    message: language.languages[lan].error_text
                })
            );
        }
    );
};

module.exports.getbyFilters = function (request, response) {
    if (request.query.language) {
        lan = request.query.language;
    }
    console.log('query values are',request.query);
    request.query.userid = request.info;
    deal_model.getbyFilters_model(request.query).then(
        function (deals) {
            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[lan].success,
                    deals: deals
                })
            );

        },
        function (error) {
            console.log('Error while getting deals by filter', error);
            return response.send(
                JSON.stringify({
                    status: 0,
                    message: language.languages[lan].error_text
                })
            );
        }
    );
};

module.exports.add = function (request, response) {

    if (request.body.language) {
        lan = request.body.language;
    }
    deal_model.add_model(request.body).then(
        function (result) {
                return response.send(
                    JSON.stringify({
                        status: 1,
                        message: language.languages[lan].success,
                        response: result,
                    })
                );

        },
        function (err) {
            console.log(err);
            return response.send({
                status: 0,
                message: 'Error adding deal'
            });
        }
    );

};