const express = require("express");
const router = express.Router();
const { matchesLength } = require("../controllers/matchController");
const { playersLength, getTopPlayers} = require("../controllers/playersController");


// GET all players - length (summary)
router.get("/playersLength", playersLength);

// GET top 5 players
router.get("/getTopPlayers", getTopPlayers), 

//GET all matches - length (summary)
router.get("/matchesLength", matchesLength);


module.exports = router;