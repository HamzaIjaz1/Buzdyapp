var express = require('express');
var router = express.Router();
var helper = require('../mailHelper');
// var {mailOptions} = require('../mailHelper');
/* GET home page. */
var mail = '';
router.get('/', function (req, res, next) {
    console.log('inside index.js');
    helper.mailbody('buzydtxlabz@gmail.com', 'Sending Email using Node.js passing arguments to function in other file', 'That was easy!').then(
        function (result) {
            mail = result;
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
});



module.exports = router;