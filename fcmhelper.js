var fcm = require('fcm-notification');
var FCM = new fcm('./FCM/buzdy-e54a1-firebase-adminsdk-a3w4d-53b3f19b1d.json');
var token = 'token here';

var message = {
    data: { //This is only optional, you can send any data
        score: '850',
        time: '2:45'
    },
    notification: {
        title: 'Title of notification',
        body: 'Body of notification'
    },
    token: token
};


module.exports.sendMultipleAndroid = function (message, tokens) {

    FCM.sendToMultipleToken(message, tokens, function (err, response) {
        if (err) {
            console.log('err--', err);
        } else {
            console.log('response-----', response);
        }

    });
};
module.exports.sendMultipleIOS = function (message, tokens) {

    FCM.sendToMultipleToken(message, tokens, function (err, response) {
        if (err) {
            console.log('err--', err);
        } else {
            console.log('response-----', response);
        }

    });
};


module.exports.sendsingleAndroid = function (message) {

    new Promise(function (resolve, reject) {

        FCM.send(message, function (err, response) {
            if (err) {
                console.log('error found', err);
                reject(err);
            } else {
                console.log('response here', response);
                resolve(response);
            }
        });
    });

};

module.exports.sendsingleIOS = function (message) {

    new Promise(function (resolve, reject) {

        FCM.send(message, function (err, response) {
            if (err) {
                console.log('error found', err);
                reject(err);
            } else {
                console.log('response here', response);
                resolve(response);
            }
        });
    });

};