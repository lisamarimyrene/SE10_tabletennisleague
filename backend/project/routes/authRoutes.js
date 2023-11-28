const express = require("express");
const { sendEmail, Login, Refresh, Logout } = require("../controllers/authController");
const router = express.Router();
const { auth } = require("../middleware/verifyToken");

// Login route
router.post("/login", Login);

// Send email route
router.post("/sendEmail", auth, sendEmail);

// Refresh route
router.post("/refresh", Refresh)

// Logout route
router.post("/logout", Logout)


module.exports = router;

