var nodemailer = require('nodemailer');
var welcomeText = 'Welcome!';
var fs = require('fs');

var email = {
  from: 'buzydtxlabz@gmail.com',
  to: 'buzydtxlabz@gmail.com',
  subject: 'subject',
  text: 'checking 12',
  html: '<h1>NAH BRO!<h1>'
};
module.exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'buzydtxlabz@gmail.com',
    pass: 'jwO38VHNaIgn'
  }
});

module.exports.mailbody = function (to, subject, text) {
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
        email.to = 'buzydtxlabz@gmail.com';
        email.subject = 'Sending Email using Node.js passing arguments to function in other file';
        email.text = 'That was easy!';
        html=html.replace('{{name}}','User');
        email.html = html;

        resolve(email);
      }
    });
  });

};