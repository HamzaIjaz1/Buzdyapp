// 'use strict';
var deal_model = require("../model/dealModel");
var language = require("../language");
var notify = require("../fcmhelper");
var viewsModel = require("../model/viewsModel");
var notificationsModel = require("../Model/notificationsModel");
var devicesModel = require("../Model/userdeviceModel");

var lan = 0;
var notification = {
    user_id: '',
    // devicesresult.android.user_id,
    title: 'New Product',
    message: 'A merchant you are following just added a new product'
};
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
module.exports.getbyID = function (request, response) {

    if (request.query.language) {
        lan = request.query.language;
    }
    deal_model.getbyID_model(request.query.id).then(
        function (deal) {
            var view = {
                user_id: request.info,
                model_id: request.query.id,
                model_type: "product"
            };

            viewsModel.insert_views_model(view).then(
                function (result) {
                    console.log("ersult from view model is", result);
                },
                function (err) {
                    console.log("error occurred while adding view", err);
                }
            );
            return response.json({
                status: 1,
                message: language.languages[lan].success,
                deal: deal
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

module.exports.getbyFilters = function (request, response) {
    'use strict';
    if (request.query.language) {
        lan = request.query.language;
    }
    console.log("query values are", request.query);
    request.query.userid = request.info;
    deal_model.getbyFilters_model(request.query).then(
        function (deals) {
            return response.json({
                status: 1,
                message: language.languages[lan].success,
                deals: deals
            });
        },
        function (error) {
            console.log("Error while getting deals by filter", error);
            return response.json({
                status: 0,
                message: language.languages[lan].error_text
            });
        }
    );
};

module.exports.addDeal = function (request, response) {
    "use strict";

    if (typeof request.body.language !== "undefined") {
        lan = request.body.language;
        delete request.body.language;
    }
    request.body.dealable_id = request.info;
    deal_model.addDeal_model(request.body).then(
        function (result) {
            devicesModel.getfollowerDevices(request.info).then(
                function (devicesresult) {
                    console.log("recieved android Result is ", devicesresult.android);
                    console.log("recieved ios Result is ", devicesresult.ios);
                    console.log("insertID is", result.insertId);
                    message.data.id = result.insertId.toString();

                    console.log('devices result is', devicesresult);

                    notify.sendsingleAndroid(message);

                    devicesresult.android.forEach(function (element) {
                        console.log('loop');
                        resultEdit(element);
                    });

                    devicesresult.ios.forEach(function (element) {
                        console.log('loop');
                        resultEdit(element);
                    });

                },
                function (err) {
                    console.log("Error is ", err);

                }
            );
            return response.json({
                status: 1,
                message: language.languages[lan].success,
                response: result
            });
        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: "Error adding deal"
            });
        }
    ).catch(err => {
        console.log('error occurred, throwing inside catch of add deal controller', err);
        throw (err);

    });
};

function resultEdit(item) {
    notification.user_id = item.user_id;
    notificationsModel.addNotification(notification).then(
        function (notifyResult) {
            console.log('notify result is', notifyResult);

        },
        function (notifyerr) {
            console.log('notify error is', notifyerr);
        }
    );
}