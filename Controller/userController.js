var user_model = require('../model/userModel');
var jwt = require('jsonwebtoken');
var config = require('../config');
var authHelper = require('../authHelper');

module.exports.signup_user = function (req, response) {


    user_model.signup_user_model(req.body).then(
        function (result) {
            console.log(result);
            authHelper.generateToken(userinfo[0].id).then((token) => {
                console.log(userinfo);
                return response.send({
                    status: 1,
                    message: 'User successfully registered',
                    user:result,
                    token: token
                });
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
    user_model.signin_user_model(user).then(
        (userinfo) => {
            authHelper.generateToken(userinfo[0].id).then((token) => {
                console.log(userinfo);
                return response.send({
                    status: 1,
                    message: 'User successfully logged in',
                    user:userinfo,
                    token: token
                });
            });
        },
        (err) => {
            console.log('Error', err);
            return response.send({
                status: 0,
                message: 'Invalid user credentials'
            });
        }
    );
};