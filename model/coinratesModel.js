var db = require('../db');

module.exports.get_coins = function () {
    console.log('Inside get metadata model');

    var queryString = 'Select * from coin_rate';

    return new Promise(function (resolve, reject) {
        db.query(queryString, function (err, result) {

            if (err) {
                reject(err);
            } else {
                resolve(result);
                console.log('inside else model for getting coins rate');

            }
        });
    });
};