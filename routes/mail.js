var express = require('express');
var router = express.Router();
var helper = require('../mailHelper');
// var {mailOptions} = require('../mailHelper');
/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('inside index.js');
  helper.transporter.sendMail(helper.mailOptions, function(error, info){
    if (error) {
      console.log('Error while sending email',error);
    } else {
      console.log('Email sent: ' + info.response);
      return res.json({
          status:1,
          message:'email sent'
      });
    }
  });

});

module.exports = router;