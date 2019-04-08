var metadata_model = require('../model/coinsmetadataModel');
var language = require('../language');
var lan = 0;

module.exports.get_metadata = function (request, response) {
    if (request.query.language) {
        lan = request.query.language;
    }
    metadata_model.get_metadata().then(
        function (metadata) {
            return response.json({
                status: 1,
                message: language.languages[lan].success,
                metadata: metadata
            });

        },
        function (error) {
            console.log('Error while getting metadata', error);
            return response.json({
                status: 0,
                message: language.languages[lan].error_text
            });
        }
    );
};