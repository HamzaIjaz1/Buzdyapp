var db = require('../db');
var mysql = require('mysql');

module.exports.getbyID_model = function (id) {
    console.log('branch id must be', id);

    var dealid = parseInt(id);
    console.log('after parse', id);

    var queryString = "SELECT * FROM branches WHERE id = ?";
    return new Promise(function (resolve, reject) {
        db.query(queryString, [dealid], function (err, result) {
            if (err) {
                console.log('Error while getting a branch', err);
                reject(err);
            } else {
                resolve(result);

                console.log('inside else model for get a branch');
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


    var queryString = "SELECT * FROM branches ";

    if (inputs.fav){
        var fav = parseInt(inputs.fav);
        if (fav>0){
            queryString += ' JOIN fav_branch on branches.id=fav_branch.branch_id WHERE fav_branch.user_id=' + mysql.escape(inputs.userid);
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
            queryString += ' AND branches.featured = ' + mysql.escape(inputs.featured);

        } else
            queryString += ' WHERE branches.featured = ' + mysql.escape(inputs.featured);

    }
    if (inputs.bank_id) {

        // var id = parseInt(inputs.merchant_id);
        if (queryString.includes('WHERE')) {
            queryString += ' AND branches.bank_id = ' + mysql.escape(inputs.bank_ids);

        } else
            queryString += ' WHERE branches.bank_id = ' + mysql.escape(inputs.bank_id);

    }
    if (inputs.city) {
        if (queryString.includes('WHERE')) {
            queryString += ' AND branches.city = ' + mysql.escape(inputs.city);

        } else
            queryString += ' WHERE branches.city = ' + mysql.escape(inputs.city);

    }
    if (inputs.country) {
        if (queryString.includes('WHERE')) {
            queryString += ' AND branches.country = ' + mysql.escape(inputs.country);

        } else
            queryString += ' WHERE branches.country = ' + mysql.escape(inputs.country);

    }

    if (inputs.latitude && inputs.longitude) {
        if (inputs.radius) {
            myradius = inputs.radius;
        }
        if (queryString.includes('WHERE')) {
            queryString += 'AND (3959 * acos(cos(radians(' + mysql.escape(inputs.latitude) + '))*cos(radians(branches.latitude))*cos(radians(branches.longitude) - radians(' + mysql.escape(inputs.longitude) + ')) + sin(radians(' + mysql.escape(inputs.latitude) + ')) * sin(radians(branches.latitude)))) >' + mysql.escape(myradius);
        } else
        queryString += ' WHERE (3959 * acos(cos(radians(' + mysql.escape(inputs.latitude) + '))*cos(radians(branches.latitude))*cos(radians(branches.longitude) - radians(' + mysql.escape(inputs.longitude) + ')) + sin(radians(' + mysql.escape(inputs.latitude) + ')) * sin(radians(branches.latitude)))) >' + mysql.escape(myradius);
    }

    queryString += ' LIMIT ' + pagesize + ' OFFSET ' + pagenumber;

    return new Promise(function (resolve, reject) {
        console.log('Query String is',queryString);
        db.query(queryString, function (err, result) {
            if (err) {
                console.log('Error while getting all branches', err);
                reject(err);
            } else {
                resolve(result);

                console.log('inside else model for get all branches');
            }

        });
    });
};