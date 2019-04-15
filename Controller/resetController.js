var language = require("../language");
var resetModel = require("../Model/resetModel");
var lan = 0;

module.exports.handle_reset = function (request, response) {
    console.log("This is request data", request.query);
    if (typeof request.query.language !== "undefined") {
        lan = request.query.language;
    }

    resetModel.reset_model(request.query.token).then(
        function (result) {
            console.log("result received is", result);
            if (result[0]){
                return response.json({
                    status: 1,
                    message: language.languages[lan].success,
                });
            }else{
                return response.json({
                status: 1,
                message: 'Token Expired'
            });
            }
            
        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: "Error resetting"
            });
        }
    );
};