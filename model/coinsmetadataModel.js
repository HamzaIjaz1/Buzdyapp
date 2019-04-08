var db = require('../db');

module.exports.get_metadata = function () {
    console.log('Inside get metadata model');

    var queryString = 'Select * from coins_metadata';

    return new Promise(function (resolve, reject) {
        db.query(queryString, function (err, result) {

            if (err) {
                reject(err);
            } else {
                resolve(result);
                console.log('inside else model for getting coins metadata');

            }
        });
    });
};