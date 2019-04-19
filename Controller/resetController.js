var language = require("../language");
var resetModel = require("../Model/resetModel");
var helper = require('../mailHelper');
var lan = 0;

module.exports.handle_reset = function (request, response) {
    console.log("This is request data", request.query);
    if (typeof request.query.language !== "undefined") {
        lan = request.query.language;
    }

    resetModel.reset_model(request.query.token).then(
        function (result) {
            console.log("result received is", result);
            if (result[0]) {
                return response.json({
                    status: 1,
                    message: language.languages[lan].success
                });
            } else {
                return response.json({
                    status: 0,
                    message: 'Token Expired',
                    token:request.query.token
                });
            }

        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: "Error resetting"
            });
        }
    );
};

module.exports.generate_token = function (request, response) {
    console.log("This is request data inside generate token controllers", request.body);
    if (typeof request.body.language !== "undefined") {
        lan = request.body.language;
        delete request.body.language;
    }

    var generate_token = makeid(5);
    request.body.token = generate_token;
    var  reset={
        user_id:request.body.user_id,
        token:request.body.token
      };
    resetModel.addToken_model(reset).then(
        function (result) {
            console.log("result received is", result);
          var  mail={
              email:request.body.email,
              username:request.body.username,
              subject:request.body.subject,
              text:request.body.text,
              token:generate_token
            };
            helper.mailbody(mail).then(
                function (result) {
                    mail = result;
                    console.log('email result received is', mail);
                    helper.transporter.sendMail(mail, function (error, info) {
                        if (error) {
                            console.log('Error while sending email', error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            return res.json({
                                status: 1,
                                message: 'email sent'
                            });
                        }
                    });
                },
                function (err) {
                    console.log('error is', err);
                }
            );
            return response.json({
                status: 1,
                message: language.languages[lan].success,
            });
        },
        function (err) {
            console.log(err);
            return response.json({
                status: 0,
                message: "Error resetting"
            });
        }
    );
};

function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}