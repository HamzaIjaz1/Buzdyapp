var userDevice_model = require('../model/userdeviceModel');
var language = require('../language');
// var notify = require('../fcmhelper');

var lan = 0;

module.exports.add_device = function (req, response) {

    // notify.sendsingle('message');

    if (req.language) {
        lan = req.language;
    }
    req.body.user_id = req.info;
    userDevice_model.addDevice(req.body).then(
        function () {
            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[lan].success,
                })
            );

        },
        function (err) {
            console.log(err);
            return response.send({
                status: 0,
                message: 'Error registering device' + err
            });
        }
    );

};

module.exports.deleteDevice = function (req, response) {


    if (req.language) {
        lan = req.language;
    }
    req.body.user_id = req.info;
    userDevice_model.deleteDevice(req.body).then(
        function () {
            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[lan].success,
                })
            );

        },
        function (err) {
            console.log(err);
            return response.send({
                status: 0,
                message: 'Error deleting device' + err
            });
        }
    );

};

