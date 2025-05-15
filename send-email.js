const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const reportHtmlPath = path.resolve(__dirname, 'cypress/reports/mochawesome.html');
const reportJsonPath = path.resolve(__dirname, 'cypress/reports/mochawesome.json');

let summary = 'No test summary available.';

if (fs.existsSync(reportJsonPath)) {
  try {
    const report = JSON.parse(fs.readFileSync(reportJsonPath, 'utf-8'));
    summary = "\n🧪 Cypress Test Summary\n---------------------------\n\n" +
      "✅ Passed:   " + report.stats.passes + "\n" +
      "❌ Failed:   " + report.stats.failures + "\n" +
      "⚠️  Skipped:  " + report.stats.pending + "\n" +
      "📊 Total:    " + report.stats.tests + "\n" +
      "⏱ Duration: " + report.stats.duration + " ms\n";
  } catch (error) {
    console.error('Error parsing mochawesome JSON report:', error);
  }
} else {
  console.warn('Mochawesome JSON report not found at:', reportJsonPath);
}

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
  text: summary,
  attachments: [
    {
      filename: 'mochawesome.html',
      path: reportHtmlPath,
    },
  ],
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
    process.exit(1);
  } else {
    console.log('Email sent:', info.response);
  }
});
