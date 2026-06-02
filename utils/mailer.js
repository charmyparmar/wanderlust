const nodemailer = require('nodemailer');

// Configure mail transporter
// If credentials exist in .env, use them; otherwise, default to a mock logger transporter
let transporter;

if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
} else {
  // Mock transporter for development when credentials are not yet set up
  transporter = {
    sendMail: async (mailOptions) => {
      console.log('----------------- MAILBOX SIMULATION -----------------');
      console.log(`To: ${mailOptions.to}`);
      console.log(`Subject: ${mailOptions.subject}`);
      console.log(`Body:\n${mailOptions.html || mailOptions.text}`);
      console.log('------------------------------------------------------');
      return { messageId: 'mock-id-12345' };
    },
  };
}

module.exports.sendVerificationEmail = async (
  email,
  username,
  token,
  origin = 'http://localhost:3000'
) => {
  const verifyUrl = `${origin}/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Wanderlust Admin" <${process.env.EMAIL_USER || 'no-reply@wanderlust.com'}>`,
    to: email,
    subject: 'Verify your Wanderlust account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        <h2 style="color: #fe424d; text-align: center;">Welcome to Wanderlust, ${username}!</h2>
        <p>Thank you for signing up for Wanderlust - a premium marketplace for unique accommodations.</p>
        <p>Please verify your email address to unlock listing creations, reviews, and other premium features.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyUrl}" style="background-color: #fe424d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Email Address</a>
        </div>
        <p style="font-size: 0.9rem; color: #666;">This link is valid for 24 hours. If you did not sign up for Wanderlust, please ignore this email.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports.sendResetPasswordEmail = async (
  email,
  username,
  token,
  origin = 'http://localhost:3000'
) => {
  const resetUrl = `${origin}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Wanderlust Support" <${process.env.EMAIL_USER || 'no-reply@wanderlust.com'}>`,
    to: email,
    subject: 'Reset your Wanderlust account password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        <h2 style="color: #fe424d; text-align: center;">Reset your Password</h2>
        <p>Hi ${username},</p>
        <p>You requested a password reset for your Wanderlust account. Please click the button below to set a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #fe424d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p style="font-size: 0.9rem; color: #666;">This password reset link is valid for 1 hour. If you did not request this, please ignore this email and your password will remain unchanged.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
