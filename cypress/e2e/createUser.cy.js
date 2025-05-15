const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Load test results (mochawesome JSON)
const resultsPath = path.resolve(__dirname, 'cypress/reports/mochawesome.json');
const report = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

const { stats } = report;
const summary = `
Test Summary:
✔ Passed: ${stats.passes}
✘ Failed: ${stats.failures}
⚠ Pending: ${stats.pending}
⏱ Duration: ${stats.duration} ms
`;

// Set up transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Set up mail options
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'rohitpatil7424@gmail.com',
  subject: 'Cypress Test Report',
  text: summary,
  attachments: [
    {
      filename: 'mochawesome.html',
      path: path.resolve(__dirname, 'cypress/reports/mochawesome.html'),
    },
  ],
};

// Send email
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.error('Error sending email:', error);
    process.exit(1);
  } else {
    console.log('Email sent:', info.response);
  }
});
