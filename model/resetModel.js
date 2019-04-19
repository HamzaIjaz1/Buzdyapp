var db = require('../db');
var mysql = require('mysql');

module.exports.reset_model = function (token) {
    var queryString = 'select * from reset where token= ' + mysql.escape(token) + ' and created_at >= now() - INTERVAL 1440 Minute';

    return new Promise(function (resolve, reject) {
        db.query(queryString, function (err, result) {
            if (err) {
                console.log('error occured while getting token is', err);
                reject(err);
            } else {
                console.log('Inside else model result after getting token is', result);
                resolve(result);
            }
        });
    });
};

module.exports.addToken_model = function (inputs) {
    var queryString = 'Insert into reset SET ?';

    console.log('Inside add token model, data received is',inputs);
    return new Promise(function (resolve, reject) {
        db.query(queryString, inputs, function (err, result) {
            if (err) {
                console.log('error occured while adding token into database', err);
                reject(err);
            } else {
                console.log('Inside else model result after adding token is', result);
                resolve(result);
            }

        });

    });

};