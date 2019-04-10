var db = require('../db');
var mysql = require('mysql');

module.exports.insert_views_model = function (inputs) {
    var queryString = 'insert into views set ? ';

    return new Promise(function (resolve, reject) {
        db.query(queryString,inputs, function (err, result) {
            if (err) {
                console.log('error occured while adding view');
                reject(err);
            } else {
                console.log('Inside else model result after adding view is', result);
                resolve(result);
            }

        });

    });

};

module.exports.get_views_model = function (id){
    var queryString = 'select * from views where id= '+mysql.escape(id);

    return new Promise(function (resolve, reject) {
        db.query(queryString, function (err, result) {
            if (err) {
                console.log('error occured while getting view');
                reject(err);
            } else {
                console.log('Inside else model result after getting view is', result);
                resolve(result);
            }

        });

    });

}