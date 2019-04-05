var db = require('../db');
var mysql = require('mysql');

module.exports.add = function (review) {
    console.log('REVIEW DATA RECEIVED IS',review);

    var queryString = "INSERT INTO reviews SET ?";
    return new Promise(function (resolve, reject) {

        db.query(queryString, review, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result.insertId);
            }
        });

    });

};