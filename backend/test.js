require('dotenv').config();
const nodemailer = require('nodemailer');

// ✅ Setup Gmail transporter (same as your emailService.js)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Test email details
const mailOptions = {
  from: `"Bontega Store" <${process.env.EMAIL_USER}>`,
  to: "anujananya02@gmail.com", // put your second Gmail here to receive test mail
  subject: "🧪 Bontega Email Test",
  html: `
    <h2>Hello from Bontega Project!</h2>
    <p>This is a test email to verify that Nodemailer and Gmail App Password are working.</p>
    <p>If you received this message, your email setup is <strong>working perfectly ✅</strong>.</p>
  `,
};

// ✅ Send test mail
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Error:", error);
  } else {
    console.log("✅ Test email sent successfully:", info.response);
  }
});
