var db = require('../db');
var mysql = require('mysql');

module.exports.reset_model = function (token) {
    var queryString = 'select * from reset where token= '+mysql.escape(token)+' and created_at >= now() - INTERVAL 1440 Minute';

    return new Promise(function (resolve, reject) {
        db.query(queryString, function (err, result) {
            if (err) {
                console.log('error occured while adding view', err);
                reject(err);
            } else {
                console.log('Inside else model result after adding view is', result);
                resolve(result);
            }

        });

    });

};