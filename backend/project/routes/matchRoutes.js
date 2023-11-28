const express = require("express");
const {
  getAllMatches,
  getOneMatch,
  newMatch,
  populateNewMatch,
  updateMatch,
  deleteMatch,
} = require("../controllers/matchController");
const router = express.Router();
const { auth, admin } = require("../middleware/verifyToken");


// GET all matches, authorized
router.get("/", auth, getAllMatches);

// GET one match, authorized
router.get("/:id", auth, getOneMatch);

// CREATE a new match with players and id
router.post("/matchId", auth, newMatch);

// POPULATE the new match based on id
router.put("/:id", auth, populateNewMatch);

// UPDATE a match based on id
router.patch("/:id", auth, admin, updateMatch)

// DELETE a match
router.delete("/:id", auth, admin, deleteMatch);


module.exports = router;