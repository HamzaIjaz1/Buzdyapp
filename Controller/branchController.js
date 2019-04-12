var branch_model = require('../model/branchModel');
var language = require('../language');
var viewsModel = require('../model/viewsModel');


var lan = 0;

module.exports.getbyID = function (request, response) {
    if (typeof request.query.language !== 'undefined') {
        lan = request.query.language;
    }
    branch_model.getbyID_model(request.query.id).then(
        function (branch) {
            var view = {
                user_id:request.info,
                model_id:request.query.id,
                model_type:'branch'
            };

            viewsModel.insert_views_model(view).then(
                function (result){
                    console.log('ersult from view model is', result);
                },
                function (err){
                    console.log('error occurred while adding view', err);
                }
            );
            return response.json({
                status: 1,
                message: language.languages[lan].success,
                branch: branch
            });

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
    if (typeof request.query.language !== 'undefined') {
        lan = request.query.language;
    }
    console.log('query values are', request.query);
    request.query.userid = request.info;
    branch_model.getbyFilters_model(request.query).then(
        function (branches) {
            return response.json(
                {
                    status: 1,
                    message: language.languages[lan].success,
                    branches: branches
                }
            );

        },
        function (error) {
            console.log('Error while getting branches by id', error);
            return response.json(
                {
                    status: 0,
                    message: language.languages[lan].error_text
                }
            );
        }
    );
};