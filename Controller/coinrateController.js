var coin_model = require('../model/coinratesModel');
var language = require('../language');
var lan = 0;

module.exports.get_coins = function (request, response) {
    if (request.query.language) {
        lan = request.query.language;
    }
    coin_model.get_coins().then(
        function (coins) {
            return response.json({
                status: 1,
                message: language.languages[lan].success,
                coins: coins
            });

        },
        function (error) {
            console.log('Error while getting coin rates', error);
            return response.json({
                status: 0,
                message: language.languages[lan].error_text
            });
        }
    );
};