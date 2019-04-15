var db = require('../db');
var mysql = require('mysql');

module.exports.getbyID_model = function (id) {
    console.log('DEAL id must be', id);

    var dealid = parseInt(id);
    console.log('after parse', id);

    var queryString = "SELECT * FROM banks WHERE id = ?";
    return new Promise(function (resolve, reject) {
        db.query(queryString, [dealid], function (err, result) {
            if (err) {
                console.log('Error while getting a bank', err);
                reject(err);
            } else {
                resolve(result);

                console.log('inside else model for get a bank');
            }

        });
    });
};

module.exports.getbyFilters_model = function (inputs) {
    console.log('parameters received are', inputs);

    // var dealid = parseInt(id);
    // console.log('after parse', id);
    var pagenumber = 0;
    var pagesize = 5;
    var myradius = 30;
    var user = '%user';


    var queryString = "SELECT * FROM banks ";

    if (inputs.fav) {
        var fav = parseInt(inputs.fav);
        if (fav > 0) {
            queryString += ' JOIN fav_bank on banks.id=fav_bank.bank_id WHERE fav_bank.user_id=' + mysql.escape(inputs.userid);
        }
    }
    if (inputs.page_no) {
        pagenumber = inputs.page_no;
    }
    if (inputs.pagesize) {
        pagesize = inputs.pagesize;
    }
    if (inputs.featured) {

        // var id = parseInt(inputs.merchant_id);
        if (queryString.includes('WHERE')) {
            queryString += ' AND banks.featured = ' + mysql.escape(inputs.featured);

        } else
            queryString += ' WHERE banks.featured = ' + mysql.escape(inputs.featured);

    }
    if (inputs.city) {
        if (queryString.includes('WHERE')) {
            queryString += ' AND banks.city = ' + mysql.escape(inputs.city);

        } else
            queryString += ' WHERE banks.city = ' + mysql.escape(inputs.city);

    }
    if (inputs.country) {
        if (queryString.includes('WHERE')) {
            queryString += ' AND banks.country = ' + mysql.escape(inputs.country);

        } else
            queryString += ' WHERE banks.country = ' + mysql.escape(inputs.country);

    }

    if (inputs.latitude && inputs.longitude) {
        if (inputs.radius) {
            myradius = inputs.radius;
        }
        if (queryString.includes('WHERE')) {
            queryString += 'AND (3959 * acos(cos(radians(' + mysql.escape(inputs.latitude) + '))*cos(radians(banks.latitude))*cos(radians(banks.longitude) - radians(' + mysql.escape(inputs.longitude) + ')) + sin(radians(' + mysql.escape(inputs.latitude) + ')) * sin(radians(banks.latitude)))) >' + mysql.escape(myradius);
        } else
            queryString += ' WHERE (3959 * acos(cos(radians(' + mysql.escape(inputs.latitude) + '))*cos(radians(banks.latitude))*cos(radians(banks.longitude) - radians(' + mysql.escape(inputs.longitude) + ')) + sin(radians(' + mysql.escape(inputs.latitude) + ')) * sin(radians(banks.latitude)))) >' + mysql.escape(myradius);
    }

    queryString += ' LIMIT ' + pagesize + ' OFFSET ' + pagenumber;

    return new Promise(function (resolve, reject) {
        console.log('Query String is', queryString);
        db.query(queryString, function (err, result) {
            if (err) {
                console.log('Error while getting all users', err);
                reject(err);
            } else {
                resolve(result);

                console.log('inside else model for get all banks');
            }

        });
    });
};