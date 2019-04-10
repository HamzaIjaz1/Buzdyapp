var deal_model = require('../model/dealModel');
var authHelper = require('../authHelper');
var language = require('../language');
var lan = 0;

var notificationsModel = require('../Model/notificationsModel');
module.exports.getUserNotifications = function (request, response) {
    if (request.query.language) {
        lan = request.query.language;
    }
    notificationsModel.getNotifications(request.info).then(
        function (notifications) {
            return response.json({
                status: 1,
                message: language.languages[lan].success,
                notifications: notifications
            });

        },
        function (error) {
            console.log('Error while notifications by id', error);
            return response.json({
                status: 0,
                message: language.languages[lan].error_text
            });
        }
    );
};