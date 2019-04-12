var likes_model = require("../model/likesModel");
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
module.exports.insert_like = function (request, response) {
    console.log("This is request data", request.info);
    request.body.user_id = request.info;
    if (request.body.language != "undefined") {
        lan = request.language;
    }
    likes_model.insert_likes_model(request.body).then(
        function (result) {
            console.log("result received is", result);
            devicesModel.getfollowerDevices(request.info).then(
                function (devicesresult) {
                    console.log("recieved android Result is ", devicesresult.android);
                    console.log("recieved ios Result is ", devicesresult.ios);
                    console.log("insertID is", result.insertId);
                    message.data.id = result.insertId.toString();

                    notify.sendsingleAndroid(message);
                },
                function (err) {
                    console.log("Error is ", err);
                }
            );
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

module.exports.get_likes = function (request, response) {
    console.log("This is request data", request.query);
    if (typeof request.query.language !== "undefined") {
        lan = request.query.language;
    }

    likes_model.get_likes_model(request.query).then(
        function (result) {
            console.log("result received is", result);
            return response.json({
                status: 1,
                message: language.languages[0].success,
                views: result
            });
        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: "Error getting likes"
            });
        }
    );
};