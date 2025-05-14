const nodemailer = require('nodemailer');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Make sure this is set in Azure DevOps as an environment variable
    pass: process.env.EMAIL_PASS,  // Make sure this is set in Azure DevOps as an environment variable
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,  // Sender email
  to: 'rohitpatil7424@gmail.com', // Recipient email
  subject: 'Cypress Test Report',
  text: 'Attached is the latest Cypress test report.',
  attachments: [
    {
      filename: 'mochawesome.html',
      path: path.resolve(__dirname, 'cypress/reports/mochawesome.html'),  // Ensure the report is generated
    },
  ],
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.error('Error sending email:', error);
    process.exit(1);  // Exit with error code if email fails
  } else {
    console.log('Email sent: ' + info.response);
  }
});
