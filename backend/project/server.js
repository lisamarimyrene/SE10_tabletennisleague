// imports
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

// Give access to our frontend server
const corsAccess = {
  origin: [`http://localhost:5173`, `http://localhost:5174`],
  credentials: true,
};

// Set up express, cors, and cookie for the app
const app = express();
app.use(cors(corsAccess));
app.use(cookieParser());

// Require dotenv
const dotenv = require("dotenv").config();

// Setting the port and connecting to db
const PORT = process.env.PORT || 5005;
const dbconnect = require("./dbconnect");
const { application } = require("express");

// Call the connection
dbconnect();

// Parse requests of content-type - application/json
app.use(express.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/players", require("./routes/playersRoutes"));
app.use("/api/matches", require("./routes/matchRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/public", require("./routes/publicRoutes"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", require("./confirmationMail"));

// app.listen on port
app.listen(PORT, () =>
  console.log(`Server is running on https://localhost:${PORT}`)
);
