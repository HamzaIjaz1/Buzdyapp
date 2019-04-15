var conversation_model = require("../model/conversationModel");
var authHelper = require("../authHelper");
var notify = require("../fcmhelper");
var language = require("../language");
var devicesModel = require("../Model/userdeviceModel");
var lan = 0;

var message = {
    android: {
        ttl: 3600 * 1000, // 1 hour in milliseconds
        priority: "normal",
        notification: {
            title: "$GOOG up 1.43% on the day",
            body: "$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.",
            icon: "stock_ticker_update",
            color: "#f45342"
        }
    },
    data: {
        //you can send only notification or only data(or include both)
        id: 0
    },
    topic: "TopicName"
};
module.exports.insert_conversation = function (request, response) {
    console.log("This is request data", request.info);
    request.body.user1 = request.info;
    if (request.body.language != "undefined") {
        lan = request.language;
    }
    conversation_model.create_conversation_model(request.body).then(
        function (result) {
            console.log("result received is", result);
            devicesModel.getDevicebyID(request.info).then(
                function (devicesresult) {
                    console.log('recieved Result in usercontroller for follow is ', devicesresult);
                    // notify.sendsingleAndroid(message);
                    var notification = {
                        user_id: request.body.user2,
                        title: 'New Message',
                        message: 'Some one just texted you'
                    };
                    notificationsModel.addNotification(notification).then(
                        function (notifyResult) {
                            console.log('notify result is', notifyResult);

                        },
                        function (notifyerr) {
                            console.log('notify error is', notifyerr);
                        }
                    );
                },
                function (err) {
                    console.log('Error is ', err);

                }
            ).catch(function (err) {
                console.log('error occurred, insde catch after calling devices', err);
            });
            return response.json({
                status: 1,
                message: language.languages[0].success
            });
        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: "Error updating profile"
            });
        }
    );
};

module.exports.getall_conversations = function (request, response) {
    if (request.query.language) {
        lan = request.query.language;
    }
    conversation_model.getAll(request.info).then(
        function (conversation) {
            return response.json({
                status: 1,
                message: language.languages[lan].success,
                conversations: conversation
            });
        },
        function (error) {
            console.log("Error while getting merchants by id", error);
            return response.json({
                status: 0,
                message: language.languages[lan].error_text
            });
        }
    );
};

module.exports.getbyId = function (request, response) {
    if (request.query.language) {
        lan = request.query.language;
    }
    request.query.user1 = request.info;
    conversation_model.getbyid(request.query).then(
        function (conversation) {
            return response.json({
                status: 1,
                message: language.languages[lan].success,
                conversation: conversation
            });
        },
        function (error) {
            console.log("Error while getting merchants by id", error);
            return response.json({
                status: 0,
                message: language.languages[lan].error_text
            });
        }
    );
};