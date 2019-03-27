var db = require('../db');

var r = {
    Status: 1,
    Message: "Success"
};
module.exports.signup_user_model = function (user) {
    console.log(user);

    var queryString = "INSERT INTO users SET ?";
    return new Promise(function (resolve, reject) {

        db.query(queryString, user, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result.insertId);
            }
        });

    });

};

module.exports.signin_user_model = function (user) {
    console.log(user);


    var queryString = "SELECT * FROM USERS WHERE email = ? AND password = ?";
    return new Promise(function (resolve, reject) {
        db.query(queryString, [user.email, user.password], function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log('result is',result);
                resolve(result);
                
                console.log('inside else model');
            }

        });
    });
};