const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

// * Configuration mail
app.post("/confEmail", (req, res) => {
  const { username, email, password } = req.body;

  // Create a transporter with your email configuration
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "idg2100_tabletennis@hotmail.com",
      pass: "tabletennis123",
    },
  });

  // Configure the email options
  const mailOptions = {
    from: "idg2100_tabletennis@hotmail.com",
    to: `${email}`,
    subject: "Welcome to Table Tennis League App!",
    text: `Here are your user information for your new account: Username: ${username}, Email: ${email}, Password: ${password}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to send the email" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Player registered successfully" });
    }
  });
});

module.exports = app;
