var nodemailer = require('nodemailer');
var fs = require('fs');

var email = {
  from: 'buzydtxlabz@gmail.com',
  to: 'buzydtxlabz@gmail.com',
  subject: 'subject',
  text: 'checking 12',
  html: '<h1>Reset your password<h1>'
};
module.exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'buzydtxlabz@gmail.com',
    pass: 'jwO38VHNaIgn'
  }
});

module.exports.mailbody = function (mailData) {
  console.log('inside mail helper, data received is', mailData);
  return new Promise(function (resolve, reject) {
    fs.readFile('passwordReset.html', {
        encoding: 'utf-8'
      },
      function (err, html) {
        if (err) {
          console.log(error);
          reject(error);
        } else {
          console.log('I am here');
          email.to = mailData.email;
          email.subject = mailData.subject;
          email.text = mailData.text;
          html = html.replace('{{name}}', mailData.username);
          html=html.replace('{{TOKEN}}', mailData.token);
          email.html = html;

          resolve(email);
        }
      });
  });

};