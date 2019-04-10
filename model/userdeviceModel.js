var db = require('../db');
var mysql = require('mysql');

module.exports.addDevice = function (inputs) {
    console.log('Inside add device model');
    var queryCheck = 'Select count(1) as row from user_devices where device_id= ' + mysql.escape(inputs.device_id);

    return new Promise(function (resolve, reject) {
        db.query(queryCheck, function (err, checkResult) {
            if (err) {
                console.log('ERROR OCCURRED', err);
            } else {
                console.log('check result is', checkResult[0].row);
                if (checkResult[0].row >= 1) {
                    var updateQuery = 'update user_devices SET ? where device_id=' + mysql.escape(inputs.device_id);

                    db.query(updateQuery, inputs, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(checkResult);
                            console.log('else update Query', checkResult);

                        }
                    });
                } else {
                    var insertQuery = 'Insert into user_devices SET ?';

                    db.query(insertQuery, inputs, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                            console.log('Inside else add query', result);

                        }
                    });
                }

            }


        });

    });


};

module.exports.deleteDevice = function (inputs) {
    console.log('Inside add device model');

    var queryString = 'Delete from user_devices where user_id=' + mysql.escape(inputs.user_id);

    return new Promise(function (resolve, reject) {
        db.query(queryString, function (err, result) {

            if (err) {
                reject(err);
            } else {
                resolve(result);
                console.log('Inside else delete device model');

            }
        });
    });
};

module.exports.getfollowerDevices = function (input) {
    console.log('Inside get device model');

    var queryString = 'Select * from user_devices join following on user_devices.user_id=following.follower_id where following.following_id= ' + mysql.escape(input) + ' and user_devices.device_type= \'android\'';
    var queryStringIOS = 'Select * from user_devices join following on user_devices.user_id=following.follower_id where following.following_id= ' + mysql.escape(input) + ' and user_devices.device_type= \'ios\'';
    var android;
    var ios;
    var result = {
        android: [],
        ios: []
    };
    return new Promise(function (resolve, reject) {
        db.query(queryString, function (err, androidresult) {

            if (err) {
                reject(err);
            } else {
                // resolve(result);
                console.log('android result is', androidresult);
                result.android = androidresult[0];
                // android=;

                // console.log('Inside else get device model');

            }
        });

        db.query(queryStringIOS, function (err, iosresult) {

            if (err) {
                reject(err);
            } else {
                result.ios = iosresult[0];

                resolve(result);
                console.log('Inside else get device model');

            }
        });
    });
};

module.exports.getDevicebyID = function (id) {
    console.log('The id received is', id);

    var queryString = 'select * from user_devices where user_devices.user_id=' + mysql.escape(id);
    return new Promise(function (resolve, reject) {

        db.query(queryString, function (err, result) {

            if (err) {
                reject(err);
            } else {
                console.log('the result I have received is', result[0]);

                resolve(result[0]);
                console.log('Inside else get devicebyID model');

            }
        });

    });
};