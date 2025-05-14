const nodemailer = require('nodemailer');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'rohitpatil7424@gmail.com',
  subject: 'Cypress Test Report',
  text: 'Attached is the latest Cypress test report.',
  attachments: [
    {
      filename: 'mochawesome.html',
      path: path.resolve(__dirname, 'cypress/reports/mochawesome.html'),
    },
  ],
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.error('Error sending email:', error);
    process.exit(1);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
