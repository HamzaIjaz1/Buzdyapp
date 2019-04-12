var db = require('../db');
var mysql = require('mysql');

module.exports.insert_likes_model = function (inputs) {
    var queryString = 'insert into likes set ? ';

    return new Promise(function (resolve, reject) {
        db.query(queryString, inputs, function (err, result) {
            if (err) {
                console.log('error occured while adding like', err);
                reject(err);
            } else {
                console.log('Inside else model result after adding like is', result);
                resolve(result);
            }

        });

    });

};

module.exports.get_likes_model = function (inputs) {
    var queryString = 'select * from likes';

    if (inputs.user_id) {
        queryString += ' Where likes.user_id= ' + mysql.escape(inputs.user_id);
    } else
    if (inputs.model_id) {
        queryString += ' Where likes.model_id= ' + mysql.escape(inputs.model_id);

    } else
    if (inputs.model_type) {
        queryString += ' Where likes.model_type= ' + mysql.escape(inputs.model_type);

    }

    return new Promise(function (resolve, reject) {
        console.log('query is', queryString);
        db.query(queryString, function (err, result) {
            if (err) {
                console.log('error occured while getting likes');
                reject(err);
            } else {
                console.log('Inside else model result after getting likes is', result);
                resolve(result);
            }

        });

    });

}