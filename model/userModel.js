var db = require('../db');
var mysql = require('mysql');

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
                resolve(result);

                console.log('inside else model');
            }

        });
    });
};

module.exports.getbyID_model = function (id) {
    console.log('user id must be', id);

    var userid = parseInt(id.id);
    console.log('after parse', id.id);

    var queryString = "SELECT * FROM users WHERE users.id = ?";
    return new Promise(function (resolve, reject) {
        db.query(queryString, [userid], function (err, result) {
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


module.exports.getall_model = function (inputs) {
    console.log('Filters to get all merchants are', inputs);
    var pagenumber = 0;
    var pagesize = 5;
    var myradius = 30;



    var queryString = "SELECT * FROM users";
    if (inputs.from_time && inputs.to_time) {
        queryString += ' LEFT JOIN timings on timings.timingable_id=users.id WHERE timings.from_time = ' + mysql.escape(inputs.from_time) + ' AND timings.to_time= ' + mysql.escape(inputs.to_time);
    }
    if (inputs.page_no) {
        pagenumber = inputs.page_no;
    }
    if (inputs.pagesize) {
        pagesize = inputs.pagesize;
    }
    if (inputs.merchant_featured) {
        if (queryString.includes('WHERE')) {
            queryString += ' AND users.featured = ' + mysql.escape(inputs.merchant_featured);

        } else
            queryString += ' WHERE users.featured = ' + mysql.escape(inputs.merchant_featured);
    }
    if (inputs.keyword) {
        if (queryString.includes('WHERE')) {
            queryString += ' AND users.name Like % ' + mysql.escape(inputs.keyword) + '%';

        } else
            queryString += ' WHERE users.name Like % ' + mysql.escape(inputs.keyword) + '%';
    }
    if (inputs.country) {
        console.log('country found');
        if (queryString.includes('WHERE')) {
            queryString += ' AND users.country = ' + mysql.escape(inputs.country);

        } else
            queryString += ' WHERE users.country = ' + mysql.escape(inputs.country);
    }
    if (inputs.city) {
        if (queryString.includes('WHERE')) {
            queryString += ' AND users.city= ' + mysql.escape(inputs.city);
        } else
            queryString += ' WHERE users.city = ' + mysql.escape(inputs.city);
    }
    if (inputs.latitude && inputs.longitude) {
        if (inputs.radius) {
            myradius = inputs.radius;
        }
        if (queryString.includes('WHERE')) {
            queryString += 'AND (3959 * acos(cos(radians(' + mysql.escape(inputs.latitude) + '))*cos(radians(latitude))*cos(radians(longitude) - radians(' + mysql.escape(inputs.longitude) + ')) + sin(radians(' + mysql.escape(inputs.latitude) + ')) * sin(radians(latitude)))) >' + mysql.escape(myradius);
        } else
            queryString += ' WHERE (3959 * acos(cos(radians(' + mysql.escape(inputs.latitude) + '))*cos(radians(latitude))*cos(radians(longitude) - radians(' + mysql.escape(inputs.longitude) + ')) + sin(radians(' + mysql.escape(inputs.latitude) + ')) * sin(radians(latitude)))) >' + mysql.escape(myradius);
    }


    queryString += ' LIMIT ' + pagesize + ' OFFSET ' + pagenumber;

    return new Promise(function (resolve, reject) {
        console.log('query string is', queryString);
        db.query(queryString, function (err, result) {
            if (err) {
                console.log('Error while getting all users', err);
                reject(err);
            } else {
                // console.log('Inside model result is',result);
                resolve(result);

                console.log('inside else model for get all merchants');
            }

        });
    });
};


module.exports.follow_model = function (inputs) {
    console.log('Model received: ', inputs);

    return new Promise(function (resolve, reject) {

        var queryString = "INSERT INTO following SET ?";
        db.query(queryString, inputs, function (err, result) {
            if (err) {
                reject(err);
            } else {
              resolve(result);
            }
        });
    });

};

module.exports.unfollow_model = function (inputs) {
    console.log('Model received: ', inputs);

    return new Promise(function (resolve, reject) {

        var queryString = "Delete from following WHERE following.follower_id=? AND following.following_id=?";
        db.query(queryString, [inputs.follower_id, inputs.following_id], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });

    });

};


module.exports.update_model = function (inputs) {
    console.log('Model received: ', inputs);

    return new Promise(function (resolve, reject) {

        var queryString = "update users set ? where users.id= " + mysql.escape(inputs.id);
        db.query(queryString, inputs, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });

    });

};

module.exports.updateCoins_model = function (inputs) {
    console.log('Model received: ', inputs);

    return new Promise(function (resolve, reject) {

        var queryString = "update users set users.coins= " + inputs.number + " where users.id= " + mysql.escape(inputs.id);
        db.query(queryString, function (err, result) {
            if (err) {
                console.log('updating user coins error!');
                reject(err);
            } else {
                console.log('updating user coins success');
                resolve(result);
            }
        });

    });

};

module.exports.getCoins_model = function (inputs) {
    console.log('Model received: ', inputs);

    return new Promise(function (resolve, reject) {

        var queryString = "Select coins from users where users.id= " + mysql.escape(inputs.id);
        db.query(queryString, function (err, result) {
            if (err) {
                console.log('getting user coins error!');
                reject(err);
            } else {
                console.log('getting user coins success');
                resolve(result);
            }
        });

    });

};