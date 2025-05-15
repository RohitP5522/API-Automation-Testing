const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Load and parse JSON report
const reportPath = path.resolve(__dirname, 'cypress/reports/mochawesome.json');
let summary = 'No test summary available.';
if (fs.existsSync(reportPath)) {
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
  summary = `
🧪 **Cypress Test Summary**
----------------------------
✅ Passed:   ${report.stats.passes}
❌ Failed:   ${report.stats.failures}
⚠️  Skipped:  ${report.stats.pending}
📊 Total:    ${report.stats.tests}
⏱ Duration: ${report.stats.duration} ms
`;
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'rohitpatil7424@gmail.com',
  subject: 'Cypress Test Report',
  text: summary, // Summary in plain text email
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
