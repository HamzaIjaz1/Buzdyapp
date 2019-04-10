var deal_model = require('../model/dealModel');
var authHelper = require('../authHelper');
var language = require('../language');
var notify = require('../fcmhelper');
var lan = 0;
var devicesModel = require('../Model/userdeviceModel');

module.exports.getbyID = function (request, response) {
    if (request.query.language) {
        lan = request.query.language;
    }
    deal_model.getbyID_model(request.query.id).then(
        function (deal) {
            return response.json({
                status: 1,
                message: language.languages[lan].success,
                deal: deal
            });

        },
        function (error) {
            console.log('Error while getting merchants by id', error);
            return response.json({
                status: 0,
                message: language.languages[lan].error_text
            });
        }
    );
};

module.exports.getbyFilters = function (request, response) {
    if (request.query.language) {
        lan = request.query.language;
    }
    console.log('query values are', request.query);
    request.query.userid = request.info;
    deal_model.getbyFilters_model(request.query).then(
        function (deals) {
            return response.json({
                status: 1,
                message: language.languages[lan].success,
                deals: deals
            });

        },
        function (error) {
            console.log('Error while getting deals by filter', error);
            return response.json({
                status: 0,
                message: language.languages[lan].error_text
            });
        }
    );
};

module.exports.addDeal = function (request, response) {

    if (request.body.language) {
        lan = request.body.language;
    }
    deal_model.addDeal_model(request.body).then(
        function (result) {
            devicesModel.getDevices(request.info).then(
                function (result) {
                    console.log('recieved android Result is ', result.android);
                    console.log('recieved ios Result is ', result.ios);

                    notify.sendsingleAndroid('message');

                },
                function (err) {
                    console.log('Error is ', err);

                }
            );
            // if (result.length > 0) {
            //     console.log('result of tokenquery is', result);
            //     notify.sendsingleAndroid('message');
            // }

            // var obj = {
            //     notification_type : "POST_DEAL",
            //     deal_id : 5,
            //     message : 
            // }
            // ' {name} has posted a deal ','Hamza Ijaz'

            return response.json({
                status: 1,
                message: language.languages[lan].success,
                response: result,
            });

        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: 'Error adding deal'
            });
        }
    );

};