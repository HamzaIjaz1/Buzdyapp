var userDevice_model = require('../model/userdeviceModel');
var language = require('../language');

var lan = 0;

module.exports.add_device = function (req, response) {

    if (typeof req.body.language !== 'undefined') {
        lan = req.body.language;
        delete req.body.language;
    }
    req.body.user_id = req.info;
    userDevice_model.addDevice(req.body).then(
        function () {
            return response.json({
                status: 1,
                message: language.languages[lan].success,
            });

        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: 'Error registering device' + err
            });
        }
    );

};

module.exports.deleteDevice = function (req, response) {


    if (typeof req.body.language !== 'undefined') {
        lan = req.body.language;
    }
    req.body.user_id = req.info;
    userDevice_model.deleteDevice(req.body).then(
        function () {
            return response.json({
                status: 1,
                message: language.languages[lan].success,
            });

        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: 'Error deleting device' + err
            });
        }
    );

};