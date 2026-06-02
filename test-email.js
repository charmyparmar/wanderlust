require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('--- Nodemailer Diagnostic Tool ---');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('ERROR: EMAIL_USER or EMAIL_PASS is missing in your .env file!');
  process.exit(1);
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
  to: process.env.EMAIL_USER, // Send a test mail to yourself!
  subject: 'Wanderlust Email Diagnostic Test',
  text: 'If you are reading this email, your Nodemailer email system is working perfectly!',
};

console.log('Sending test email to yourself...');

transporter
  .sendMail(mailOptions)
  .then((info) => {
    console.log('SUCCESS! Test email sent successfully.');
    console.log('Message ID:', info.messageId);
  })
  .catch((err) => {
    console.error('FAILED to send email. Exact error details below:');
    console.error(err);
  });
