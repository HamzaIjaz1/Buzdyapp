var db = require('../db');

module.exports.getbyID_model = function (id) {
    console.log('DEAL id must be', id);

    var dealid = parseInt(id);
    console.log('after parse', id);

    var queryString = "SELECT * FROM products WHERE id = ?";
    return new Promise(function (resolve, reject) {
        db.query(queryString, [dealid], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);

                console.log('inside else model for get products by id');
            }

        });
    });
};
