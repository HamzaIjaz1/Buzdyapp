var product_model = require('../model/productModel');
var authHelper = require('../authHelper');
var language = require('../language');
var notify = require('../fcmhelper');
var devicesModel = require('../Model/userdeviceModel');
var lan = 0;

module.exports.getbyID = function (request, response) {
    if (request.query.language) {
        lan = request.query.language;
    }
    product_model.getbyID_model(request.query.id).then(
        function (product) {
            return response.json({
                status: 1,
                message: language.languages[lan].success,
                product: product
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

    product_model.getbyFilters_model(request.query).then(
        function (products) {
            return response.json({
                status: 1,
                message: language.languages[lan].success,
                products: products
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


module.exports.addProduct = function (request, response) {

    if (request.body.language) {
        lan = request.body.language;
    }
    request.body.productable_id=request.info;
    product_model.addProduct_model(request.body).then(
        function (result) {
            devicesModel.getfollowerDevices(request.info).then(
                function (devicesresult) {
                    console.log('recieved android Result is ', devicesresult.android);
                    console.log('recieved ios Result is ', devicesresult.ios);

                    notify.sendsingleAndroid(message);

                },
                function (err) {
                    console.log('Error is ', err);

                }
            );
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

module.exports.compare = function (request, response) {

    console.log('Request data is', request.body);

    product_model.compare(request.query.ids).then(
        function (result) {
            return response.json({
                status: 1,
                message: language.languages[0].success,
                products: result
            })

        },
        function (err) {
            console.log('Error occurred in compare controller', err);
            return response.json({
                status: 0,
                message: err
            });

        }
    );
};