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