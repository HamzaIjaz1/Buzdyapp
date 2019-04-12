var user_model = require('../model/userModel');
var authHelper = require('../authHelper');
var {languages} = require('../language');
var notify = require('../fcmhelper');
var notify = require('../fcmhelper');
var devicesModel = require('../Model/userdeviceModel');
var notificationsModel = require('../Model/notificationsModel');
var lan = 0;

module.exports.signup_user = function (request, response) {

    if (typeof request.body.language !== 'undefined') {
        lan = request.body.language;

    }
    user_model.signup_user_model(request.body).then(
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
    if (typeof request.body.language !== 'undefined') {
        lan = request.body.language;

    }

    user_model.signin_user_model(user).then(
        (userinfo) => {
            if (typeof userinfo !== 'undefined' && userinfo.length > 0){
                 authHelper.generateToken(userinfo[0].id).then((token) => {
                return response.json(
                    {
                        status: 1,
                        message: languages[lan].success,
                        user: userinfo,
                        token: token
                    }
                );
            });
            }
            else{
                return response.json(
                    {
                        status: 0,
                        message:'User not found',

                    }
                );
            }
           
        },
        (err) => {
            console.log('Error', err);
            return response.send(
                JSON.stringify({
                    status: 0,
                    message: languages[lan].error_text
                })
            );

        }
    );
};

module.exports.getbyID = function (request, response) {
    if (typeof request.query.language !== 'undefined') {
        lan = request.query.language;

    }
    user_model.getbyID_model(request.query).then(
        function (users) {
            return response.send(
                JSON.stringify({
                    status: 1,
                    message: languages[lan].success,
                    merchants: users
                })
            );

        },
        function (error) {
            console.log('Error while getting merchants by id', error);
            return response.send(
                JSON.stringify({
                    status: 0,
                    message: languages[lan].error_text
                })
            );
        }
    );
};


module.exports.getall = function (request, response) {
    if (typeof request.body.language !== 'undefined') {
        lan = request.body.language;

    }
    user_model.getall_model(request.query).then(
        function (users) {
            return response.send(
                JSON.stringify({
                    status: 1,
                    message: languages[lan].success,
                    merchants: users
                })
            );

        },
        function (error) {
            console.log('Error while getting merchants by id', error);
            return response.send(
                JSON.stringify({
                    status: 0,
                    message: languages[lan].error_text
                })
            );
        }
    );
};

module.exports.follow_merchant = function (request, response) {
    console.log('This is request data', request.info);
    if (typeof request.body.language !== 'undefined') {
        lan = request.body.language;

    }
    request.body.follower_id = request.info;
    user_model.follow_model(request.body).then(
        function (result) {
            
            devicesModel.getDevicebyID(request.info).then(
                function (devicesresult) {
                    console.log('recieved Result in usercontroller for follow is ', devicesresult);
                    // notify.sendsingleAndroid(message);
                    var notification={
                        user_id:request.info,
                        title:'New Follower',
                        message:'You have a new follower'
                    }
                    notificationsModel.addNotification(notification).then(
                        function(notifyResult){
                            console.log('notify result is', notifyResult);

                        },
                        function(notifyerr){
                            console.log('notify error is', notifyerr);
                        }
                    );

                },
                function (err) {
                    console.log('Error is ', err);

                }
            ).catch(function (err) {
                console.log('error occurred, insde catch after calling devices', err);
            });
            return response.json({
                status: 1,
                message: languages[lan].success
            });
        },
        function (err) {
            console.log(err);
            return response.send({
                status: 0,
                message: 'Error following merchant'
            });
        }
    ).catch(function (err) {
        console.log('error occurred, insde catch after model', err);
        response.json({
            error:err
        });
    });

};


module.exports.unfollow_merchant = function (request, response) {
    
    console.log('This is request data', request.info);
    if (typeof request.body.language !== 'undefined') {
        lan = request.body.language;

    }
    request.body.follower_id = request.info;
    user_model.unfollow_model(request.body).then(
        function (result) {
            console.log('result received is', result);
            return response.json(
                {
                    status: 1,
                    message: languages[lan].success
                }
            );

        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: 'Error unfollowing merchant'
            });
        }
    );

};


module.exports.update = function (request, response) {
    // console.log('This is the request object',request);
    console.log('This is request data', request.info);
    if (typeof request.body.language !== 'undefined') {
        lan = request.body.language;
        delete request.body.language;
    }
    request.body.id = request.info;
    user_model.update_model(request.body).then(
        function (result) {
            console.log('result received is', result);
            return response.json({
                status: 1,
                message: languages[lan].success
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
    if (typeof request.body.language !== 'undefined') {
        lan = request.body.language;
        delete request.body.language;
    }
    request.body.id = request.info;
    user_model.updateCoins_model(request.body).then(
        function (result) {
            console.log('result received is', result);
            return response.json({
                status: 1,
                message: languages[lan].success
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
    if (typeof request.body.language !== 'undefined') {
        lan = request.body.language;
    }
    request.body.id = request.info;
    user_model.getCoins_model(request.body).then(
        function (result) {
            console.log('result received is', result);
            return response.json({
                status: 1,
                message: languages[lan].success,
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

module.exports.getfollowers = function (request, response){
    if (typeof request.body.language !== 'undefined') {
        lan = request.body.language;
    }
    user_model.get_follower_model(request.info).then(
        function (result) {
            console.log('result received is', result);
            return response.json({
                status: 1,
                message: languages[lan].success,
                followers: result
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

module.exports.getfollowing = function (request, response){
    if (typeof request.body.language !== 'undefined') {
        lan = request.body.language;
    }
    user_model.get_following_model(request.info).then(
        function (result) {
            console.log('result received is', result);
            return response.json({
                status: 1,
                message: languages[lan].success,
                following: result
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

// console.log('I have got language', request.body.language);
//         console.log('I set this language as', lan);