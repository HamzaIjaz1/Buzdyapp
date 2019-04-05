var product_model = require('../model/productModel');
var authHelper = require('../authHelper');
var language = require('../language');

var lan = 0;

module.exports.getbyID = function (request, response) {
    if (request.query.language) {
        lan = request.query.language;
    }
    product_model.getbyID_model(request.query.id).then(
        function (product) {
            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[lan].success,
                    product: product
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

    product_model.getbyFilters_model(request.query).then(
        function (products) {
            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[lan].success,
                    products: products
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


module.exports.add = function (request, response) {

    if (request.body.language) {
        lan = request.body.language;
    }
    product_model.add_model(request.body).then(
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

module.exports.compare = function (request, response){

    console.log('Request data is', request.body);

    product_model.compare(request.query.ids).then(
        function (result){
            return response.json (
                {
                    status: 1,
                    message: language.languages[0].success,
                    products: result
                }
            )

        },
        function(err){
            console.log('Error occurred in compare controller',err);
            return response.send(
                JSON.stringify({
                    status:0,
                    message:err
                })
            );

        }
    );
};