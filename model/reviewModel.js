var db = require('../db');
var mysql = require('mysql');

module.exports.add = function (review) {
    console.log('REVIEW DATA RECEIVED IS', review);

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

module.exports.get_reviews_model = function (inputs) {
    console.log('Filters to get all merchants are', inputs);
    var pagenumber = 0;
    var pagesize = 5;
    var myradius = 30;
    var user = 'App\\Models\\User';
    var bank = 'App\\Models\\Bank';
    var merchant = 'App\\Models\\Merchant';



    var queryString = "SELECT * FROM reviews";
    if (inputs.type) {
        if (inputs.type == 'user') {
            queryString += ' where reviews.reviewable_type= ' + mysql.escape(user);

        } else
        if (inputs.type == 'Bank') {
            queryString += ' where reviews.reviewable_type= ' + mysql.escape(bank);

        } else
            queryString += ' where reviews.reviewable_type= ' + mysql.escape(merchant);
    }else
    if (inputs.user_id){
        queryString += ' where reviews.user_id= ' + mysql.escape(inputs.user_id);

    }

    queryString += ' LIMIT ' + pagesize + ' OFFSET ' + pagenumber;

    return new Promise(function (resolve, reject) {
        console.log('query string is', queryString);
        db.query(queryString, function (err, result) {
            if (err) {
                console.log('Error while getting all reviews', err);
                reject(err);
            } else {
                resolve(result);

                console.log('inside else model for get all merchants result is', result);
            }

        });
    });
};