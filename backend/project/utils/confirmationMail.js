const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

// * Configuration mail
app.post("/confEmail", (req, res) => {
  const { username, email, password } = req.body;

  // Check if the email domain is hotmail.com
  if (email.endsWith("@hotmail.com")) {
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
        res.status(500).json({ message: "Failed to send the email" });
      } else {
        res.status(200).json({ message: "Player registered successfully" });
      }
    });
    
  } else {
    // For non-hotmail accounts, return a different status code and message
    res.status(500).json({ message: "Email must belong to hotmail.com domain" });
  }
});

module.exports = app;
