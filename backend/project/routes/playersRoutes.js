const express = require("express");
const router = express.Router();
const {
  getAllPlayers,
  getOnePlayer,
  playersRanked,
  updatePlayer,
  deletePlayer,
  addFavoritePlayer,
  removeFavoritePlayer,
  getFavoritePlayers
} = require("../controllers/playersController");
const { createPlayer, createAdmin } = require("../controllers/authController");
const { auth, admin } = require("../middleware/verifyToken");


// GET all players
router.get("/", auth, getAllPlayers);

// GET all players, sorted by rank
router.get("/playersRanked", auth, playersRanked);

// GET one player
router.get("/:id", auth, getOnePlayer);

// CREATE a new player
router.post("/", createPlayer);

// PATCH / Update a player
router.patch("/:id", auth, updatePlayer);

// PATCH / Update player to admin
router.patch("/admin/:id", auth, admin, createAdmin)

// DELETE a player
router.delete("/:id", auth, admin, deletePlayer);

// PATCH / Update favorite player to the user
router.patch("/addFavoritePlayer/:id", auth, addFavoritePlayer);

// DELETE favorite player to the user
router.patch("/removeFavoritePlayer/:id", auth, removeFavoritePlayer);

// GET the favorite players from the user
router.get("/getFavoritePlayers/:id", auth, getFavoritePlayers);


module.exports = router;
