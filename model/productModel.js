var db = require('../db');


module.exports.get_categories = function (input) {
    console.log('inside categories model!');

    var totalpages = 0;
    var pagenumber = 1;
    var pagesize = 5;


    if (typeof input.page_no != 'undefined') {
        pagenumber = parseInt(input.page_no);
        console.log('page number', pagenumber);
    }
    if (typeof input.page_size !== 'undefined') {
        pagesize = parseInt(input.page_size);
    }

    if (typeof input.country != 'undefined') {
        var queryString = "select * from categories JOIN products on categories.id=products.category_id JOIN users ON products.productable_id = users.id where users.country= ? limit ? OFFSET ?";
        return new Promise(function (resolve, reject) {

            db.query(queryString, [input.country, pagesize, pagenumber], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    console.log('Result of select from category country wise is');
                    resolve(result);
                }
            });

        });
    } else {
        var queryString = "Select * from categories limit ? OFFSET ?";
        return new Promise(function (resolve, reject) {

            db.query(queryString, [pagesize, pagenumber], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });

        });
    }
};
