const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// * Check if user is autentificated
const auth = (req, res, next) => {
    const token = req.header("authToken");
    // If user doesnt have token, deny access
    if (!token) {
        return res.status(401).send("Access denied");
    }
    // If user have token, continue
    const jwtToken = token.split(" ")[1];

    try {
        const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
        // req.role = decodedToken.role || 'user'; // Assign the user role to req.role or set it to 'user' if not found
        req.user = decodedToken;
        console.log(decodedToken);
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send({ message: "Invalid token" });
    }
};

// * Check if user is logged in as admin
const admin = (req, res, next) => {
    const token = req.header("authToken");
    // If user doesn't have token, deny access
    if (!token) {
        return res.status(401).send("Access denied");
    }
    // If user has token, continue
    const jwtToken = token.split(" ")[1];

    try {
        const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
        // Check if the user has the 'admin' role
        if (decodedToken.role !== 'admin') {
            return res.status(403).send("Unauthorized access");
        }
        // Assign the decoded token to req.user
        req.user = decodedToken;
        console.log(decodedToken);
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send({ message: "Invalid token" });
    }
};


module.exports = { auth, admin }