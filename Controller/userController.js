var user_model = require('../model/userModel');
var authHelper = require('../authHelper');
var language = require('../language');
var notify = require('../fcmhelper');

var lan = 0;

module.exports.signup_user = function (req, response) {

    if (req.language != 'undefined') {
        lan = req.language;
    }
    user_model.signup_user_model(req.body).then(
        function (result) {
            console.log(result);
            authHelper.generateToken(userinfo[0].id).then((token) => {

                console.log(userinfo);
                return response.send(
                    JSON.stringify({
                        status: 1,
                        message: language.languages[lan].success,
                        user: result,
                        token: token
                    })
                );
            });

        },
        function (err) {
            console.log(err);
            return response.send({
                status: 0,
                message: 'Error registering user'
            });
        }
    );

};

module.exports.signin_user = function (request, response) {
    var user = {
        email: request.body.email,
        password: request.body.password
    };
    if (typeof request.language != 'undefined') {
        lan = request.language;
    }

    user_model.signin_user_model(user).then(
        (userinfo) => {
            authHelper.generateToken(userinfo[0].id).then((token) => {
                return response.send(
                    JSON.stringify({
                        status: 1,
                        message: language.languages[lan].success,
                        user: userinfo,
                        token: token
                    })
                );
            });
        },
        (err) => {
            console.log('Error', err);
            return response.send(
                JSON.stringify({
                    status: 0,
                    message: language.languages[0].error_text
                })
            );

        }
    );
};

module.exports.getbyID = function (request, response) {
    if (typeof request.language != 'undefined') {
        lan = request.language;
    }
    user_model.getbyID_model(request.params).then(
        function (users) {
            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[lan].success,
                    merchants: users
                })
            );

        },
        function (error) {
            console.log('Error while getting merchants by id', error);
            return response.send(
                JSON.stringify({
                    status: 0,
                    message: language.languages[lan].error_text
                })
            );
        }
    );
};


module.exports.getall = function (request, response) {
    if (typeof request.language != 'undefined') {
        lan = request.language;
    }
    user_model.getall_model(request.query).then(
        function (users) {
            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[lan].success,
                    merchants: users
                })
            );

        },
        function (error) {
            console.log('Error while getting merchants by id', error);
            return response.send(
                JSON.stringify({
                    status: 0,
                    message: language.languages[lan].error_text
                })
            );
        }
    );
};

module.exports.follow_merchant = function (req, response) {
    console.log('This is request data', req.info);
    if (req.body.language != 'undefined') {
        lan = req.language;
    }
    req.body.follower_id = req.info;
    user_model.follow_model(req.body).then(
        function (result) {
            if (result.length > 0) {
                console.log('result of tokenquery is', result);
                notify.sendsingleAndroid('message');
            }

            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[0].success
                })
            );

        },
        function (err) {
            console.log(err);
            return response.send({
                status: 0,
                message: 'Error following merchant'
            });
        }
    );

};


module.exports.unfollow_merchant = function (req, response) {
    // console.log('This is the request object',req);
    console.log('This is request data', req.info);
    if (req.body.language != 'undefined') {
        lan = req.language;
    }
    req.body.follower_id = req.info;
    user_model.unfollow_model(req.body).then(
        function (result) {
            console.log('result received is', result);
            return response.send(
                JSON.stringify({
                    status: 1,
                    message: language.languages[0].success
                })
            );

        },
        function (err) {
            console.log(err);
            return response.send({
                status: 0,
                message: 'Error unfollowing merchant'
            });
        }
    );

};


module.exports.update = function (req, response) {
    // console.log('This is the request object',req);
    console.log('This is request data', req.info);
    if (req.body.language != 'undefined') {
        lan = req.language;
    }
    req.body.id = req.info;
    user_model.update_model(req.body).then(
        function (result) {
            console.log('result received is', result);
            return response.json({
                status: 1,
                message: language.languages[0].success
            });

        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: 'Error updating profile'
            });
        }
    );

};

module.exports.updateCoins = function (request, response) {
    if (request.body.language != 'undefined') {
        lan = request.language;
    }
    request.body.id = request.info;
    user_model.updateCoins_model(request.body).then(
        function (result) {
            console.log('result received is', result);
            return response.json({
                status: 1,
                message: language.languages[0].success
            });

        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: 'Error updating coins'
            });
        }
    );
};

module.exports.getCoins = function (request, response) {
    if (request.body.language != 'undefined') {
        lan = request.language;
    }
    request.body.id = request.info;
    user_model.getCoins_model(request.body).then(
        function (result) {
            console.log('result received is', result);
            return response.json({
                status: 1,
                message: language.languages[0].success,
                coins: result[0].coins
            });

        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: 'Error updating coins'
            });
        }
    );
};