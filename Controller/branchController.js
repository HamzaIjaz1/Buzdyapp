var branch_model = require('../model/branchModel');
var language = require('../language');

var lan = 0;

module.exports.getbyID = function (request, response) {
    if (request.query.language) {
        lan = request.query.language;
    }
    branch_model.getbyID_model(request.query.id).then(
        function (branch) {
            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[lan].success,
                    branch: branch
                })
            );

        },
        function (error) {
            console.log('Error while getting bank by id', error);
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
    console.log('query values are', request.query);
    request.query.userid = request.info;
    branch_model.getbyFilters_model(request.query).then(
        function (branches) {
            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[lan].success,
                    branches: branches
                })
            );

        },
        function (error) {
            console.log('Error while getting branches by id', error);
            return response.send(
                JSON.stringify({
                    status: 0,
                    message: language.languages[lan].error_text
                })
            );
        }
    );
};