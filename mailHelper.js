var nodemailer = require('nodemailer');
module.exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'buzydtxlabz@gmail.com',
      pass: 'jwO38VHNaIgn'
    }
  });
  
  module.exports.mailOptions = {
    from: 'buzydtxlabz@gmail.com',
    to: 'buzydtxlabz@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
