const playersSchema = require("../schemas/playersSchema");
const refreshTokenSchema = require("../schemas/refreshTokenSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");


// Soruce: https://www.bezkoder.com/node-js-mongodb-auth-jwt/
// * Login controller
const Login = async (req, res) => {
    try {
        // Get email and password from the client
        const { email, password } = req.body;

        // Check if there is a matching player in the db
        const player = await playersSchema.findOne({ email });

        // If there are no player that match the email, return none.
        if (!player) {
            return res.status(404).send({ message: "Player not found." });
        }

        // Check if the password is valid
        const passwordIsValid = await bcrypt.compare(password, player.password);

        // If the password doesn't match, return none.
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password!",
            });
        }

        // Set payload (user id, and user role)
        const payload = {
            id: player.id,
            role: player.role,
        };

        // Set token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 86400, // 24 hours
        });

        // Set refresh token
        const generatedTokenString = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        // Delete old existing refresh tokens
        await refreshTokenSchema.deleteMany({
            userId: player.id,
        });

        // Populate db with new data
        await refreshTokenSchema.create({
            userId: player.id,
            role: player.role,
            generatedTokenString: generatedTokenString,
            expireDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });

        // Assigning refresh token in http-only cookie 
        res.cookie('refreshToken', generatedTokenString, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ accessToken: token });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
};

// * Handle refresh token
const Refresh = async (req, res) => {
    try {
        // If you find cookie with refreshToken
        if (req.cookies?.refreshToken) {
            // Destructuring refreshToken from cookie
            const refreshToken = req.cookies.refreshToken;

            // Check if there is a matching player in the db
            const findRefreshToken = await refreshTokenSchema.findOne({ generatedTokenString: refreshToken });

            // If it can't find any refresh token, then return.
            if (!findRefreshToken) {
                return res.status(404).send({ message: "Cannot find refreshToken." });
            }

            // If the refreshToken's data is less from todays date, then return. 
            if (findRefreshToken.expireDate < Date.now()) {
                return res.status(404).send({ message: "Expire date error." });
            }

            // Set the payload
            const payload = {
                id: findRefreshToken.userId,
                role: findRefreshToken.role,
            };

            // Set token
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '1d', // 24 hours
            });

            // Set refresh token
            // Generer egen string her
            const generatedTokenString = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1d' // Expires in one day
            });

            // Delete old existing refresh tokens
            await refreshTokenSchema.deleteMany({ generatedTokenString: refreshToken });

            // Populate refreshToken collection with new data
            await refreshTokenSchema.create({
                userId: payload.id,
                role: payload.role,
                generatedTokenString: generatedTokenString,
                expireDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
            });

            // Assigning refresh token in http-only cookie 
            res.cookie('refreshToken', generatedTokenString, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            })

            return res.status(200).json({ accessToken: token });

        } else {
            return res.status(406).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}


// * Logout controller
const Logout = async (req, res) => {
    try {
        if (req.cookies?.refreshToken) {
            console.log("yehehey");
            const refreshToken = req.cookies.refreshToken;

            // Delete old existing refresh tokens
            await refreshTokenSchema.deleteMany({ generatedTokenString: refreshToken });

            // Clear cookie 
            res.clearCookie("refreshToken");

        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}


// * Create a new player controller
const createPlayer = async (req, res) => {
    // Hash password
    const salt = await bcrypt.genSalt(10); // Generate random salt string with 10 ch
    const hashPassword = await bcrypt.hash(req.body.password, salt); // performs the actual hashing of password

    // Check if email exists
    const emailExist = await playersSchema.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send("Email does already exist");
    }

    // Check if username exists
    const usernameExist = await playersSchema.findOne({
        username: req.body.username,
    });
    if (usernameExist) {
        return res.status(400).send("Username does already exist");
    }

    //  const { role } = req.body;
    try {
        const createPlayer = await playersSchema.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword, // The hashed password
            role: req.body.role,
            institute: req.body.institute,
            points: req.body.points,
            matchesWon: req.body.matchesWon,
        });
        res.status(201).json(createPlayer);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};

// * Update a user to admin
const createAdmin = async (req, res) => {
    // Get player id
    const playerId = req.params.id;

    // Update the player's role to admin
    try {
        const updatePlayer = await playersSchema.updateOne(
            { _id: playerId }, // Use the player's ID to specify the player to update
            {
                $set: {
                    role: 'admin'
                }
            }
        );
        res.status(201).json(updatePlayer);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
}


// * Send email to user with new password
const sendEmail = async (req, res) => {
    // Initialize nodemailer
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "idg2100_tabletennis@hotmail.com",
            pass: "tabletennis123",
        },
    });

    // Get email and new password from request
    const { email, newPassword } = req.body;

    // Generate email
    const options = {
        from: "idg2100_tabletennis@hotmail.com",
        to: `${email}`,
        subject: "Table Tennis League App: Your new password",
        text: `Hi! Your password has been updated. Your new password is: ${newPassword}`,
    };

    // Send mail
    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log(err);
            res.status(500).send("Failed to send email");
        } else {
            console.log("Sent: " + info.response);
            res.send("Password updated successfully");
        }
    });
};

module.exports = { sendEmail, Login, Refresh, Logout, createPlayer, createAdmin };