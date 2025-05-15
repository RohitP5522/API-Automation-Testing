const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Paths
const reportJsonPath = path.resolve(__dirname, 'cypress/reports/merged.json');
const reportHtmlPath = path.resolve(__dirname, 'cypress/reports/mochawesome.html');

// Initialize summary
let summary = 'No test summary available.';
let shouldSend = false;

// Check if merged JSON exists and is valid
if (fs.existsSync(reportJsonPath)) {
  try {
    const report = JSON.parse(fs.readFileSync(reportJsonPath, 'utf-8'));
    if (report && report.stats) {
      shouldSend = true;
      summary = `
🧪 Cypress Test Summary
----------------------------

✅ Passed:   ${report.stats.passes}
❌ Failed:   ${report.stats.failures}
⚠️  Skipped:  ${report.stats.pending}
📊 Total:    ${report.stats.tests}
⏱ Duration: ${report.stats.duration} ms
      `;
    }
  } catch (err) {
    console.error('Invalid JSON format in merged report:', err.message);
    process.exit(1);
  }
} else {
  console.warn('Merged mochawesome report not found. Email will not be sent.');
  process.exit(0);
}

// Configure transporter (secure with OAuth2 or App Password for Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Prepare email options
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'rohitpatil7424@gmail.com',
  subject: 'Cypress Test Report',
  text: summary,
  attachments: [
    {
      filename: 'mochawesome.html',
      path: reportHtmlPath,
    },
  ],
};

// Send email
if (shouldSend) {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      process.exit(1);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
