var db = require('../db');
var mysql = require('mysql');

module.exports.addNotification = function (inputs) {
    var queryString='Insert into notifications SET ? ';

    return new Promise (function (resolve, reject){
        db.query(queryString,inputs, function(err, result){
            if (err){
                console.log('error occured while adding notification');
                reject(err);
            }
            else{
                console.log('Inside else model result after adding notification is',result);
                resolve(result);
            }

        });

    });
    
};

module.exports.getNotifications = function(user_id){
    var queryString='select * from notifications where user_id= '+mysql.escape(user_id);
    return new Promise (function (resolve, reject){
        db.query(queryString, function(err, result){
            if (err){
                console.log('error occur while getting notifications',err);
                reject(err);
            }else{
                console.log('Received notifications as', result);
            resolve(result);
            }
        })
    })
}