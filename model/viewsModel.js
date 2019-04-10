var db = require('../db');
var mysql = require('mysql');

module.exports.insert_views_model = function (inputs) {
    var queryString = 'insert into views set ? ';

    return new Promise(function (resolve, reject) {
        db.query(queryString, inputs, function (err, result) {
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

module.exports.get_views_model = function (inputs) {
    var queryString = 'select * from views';

    if (inputs.user_id) {
        queryString += ' Where views.user_id= ' + mysql.escape(inputs.user_id);
    } else
    if (inputs.model_id) {
        queryString += ' Where views.model_id= ' + mysql.escape(inputs.model_id);

    } else
    if (inputs.model_type) {
        queryString += ' Where views.model_type= ' + mysql.escape(inputs.model_type);

    }

    return new Promise(function (resolve, reject) {
        console.log('query is', queryString);
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