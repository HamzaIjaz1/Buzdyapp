var category_model = require('../model/categoriesModel');
var language = require('../language');

var lan = 0;

module.exports.get_categories = function (request, response) {
    console.log('Request information', request.info);

    if (typeof request.body.language != 'undefined') {
        lan = request.language;
        console.log('Language variable is', lan);
    }
    category_model.get_categories(request.body).then(
        function (categories_data) {

            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[lan].success,
                    categories: categories_data
                })
            );
        },
        function (err) {
            console.log('Error occurred inside categories model', err);
            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[lan].error_text
                })
            );
        }
    ).catch(function (error) {
        console.log('ERROR INSIDE CATCH of controller', error);
    });
};

   
module.exports.get_merchant_categories = function (request, response) {
    if (typeof request.query.language != 'undefined') {
        lan = request.query.language;
        console.log('Language variable is', lan);
    }
    category_model.model_get_merchant_categories(request.query).then(
        function (categories_data) {

            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[lan].success,
                    categories: categories_data
                })
            );
        },
        function (err) {
            console.log('Error occurred inside categories model', err);
            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[lan].error_text
                })
            );
        }
    ).catch(function (error) {
        console.log('ERROR INSIDE CATCH of controller for get all merchant categories', error);
    });
};