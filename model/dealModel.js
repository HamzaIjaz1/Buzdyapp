var db = require('../db');

module.exports.getbyID_model = function (id) {
    console.log('DEAL id must be', id);

    var dealid = parseInt(id);
    console.log('after parse', id);

    var queryString = "SELECT * FROM deals WHERE id = ?";
    return new Promise(function (resolve, reject) {
        db.query(queryString, [dealid], function (err, result) {
            if (err) {
                console.log('Error while getting all users', err);
                reject(err);
            } else {
                console.log('Inside model result is', result);
                resolve(result);

                console.log('inside else model for get all merchants');
            }

        });
    });
};
