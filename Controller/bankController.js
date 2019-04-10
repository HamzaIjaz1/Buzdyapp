var bank_model = require('../model/bankModel');
var authHelper = require('../authHelper');
var language = require('../language');
var viewsModel = require('../model/viewsModel');

var lan = 0;

module.exports.getbyID = function (request, response) {
    if (request.query.language) {
        lan = request.query.language;
    }
    bank_model.getbyID_model(request.query.id).then(
        function (bank) {
            var view = {
                user_id:request.info,
                model_id:request.query.id,
                model_type:'bank'
            };

            viewsModel.insert_views_model(view).then(
                function (result){
                    console.log('ersult from view model is', result);
                },
                function (err){
                    console.log('error occurred while adding view', err);
                }
            );

            return response.json(
                {
                    status: 1,
                    message: language.languages[lan].success,
                    bank: bank
                }
            );

        },
        function (error) {
            console.log('Error while getting bank by id', error);
            return response.json(
                {
                    status: 0,
                    message: language.languages[lan].error_text
                }
            );
        }
    );
};

module.exports.getbyFilters = function (request, response) {
    if (request.query.language) {
        lan = request.query.language;
    }
    console.log('query values are', request.query);
    request.query.userid = request.info;
    bank_model.getbyFilters_model(request.query).then(
        function (banks) {
            return response.json(
                {
                    status: 1,
                    message: language.languages[lan].success,
                    banks: banks
                }
            );

        },
        function (error) {
            console.log('Error while getting merchants by id', error);
            return response.json(
                {
                    status: 0,
                    message: language.languages[lan].error_text
                }
            );
        }
    );
};