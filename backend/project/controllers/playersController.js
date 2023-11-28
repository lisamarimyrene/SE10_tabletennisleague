const { objectId } = require('mongoose').Types
const playersSchema = require("../schemas/playersSchema");
const bcrypt = require("bcryptjs");


// * Find all players
const getAllPlayers = async (req, res) => {
    try {
        const showPlayers = await playersSchema.find();
        res.json(showPlayers);
    } catch (error) {
        res.json({ message: error });
        console.log(error.message);
    }
};

// * Find all players - length
const playersLength = async (req, res) => {
    try {
        const showPlayers = await playersSchema.find();
        let playersLength = showPlayers.length; // To get a total number of all players in the db
        res.json(playersLength);
    } catch (error) {
        res.json({ message: error });
    }
};

// * Find one player
const getOnePlayer = async (req, res) => {
    try {
        const showPlayer = await playersSchema.find({ _id: req.params.id });
        res.json(showPlayer);
    } catch (error) {
        res.json({ message: error });
    }
};

// * Find top 5 players
const getTopPlayers = async (req, res) => {
    try {
        //Sorts by matches won and points. If two people have the same amount of wins, the one with more points will rank higher.
        const getTop5 = await playersSchema.find().sort([
            ["matchesWon", -1],
            ["points", -1],
        ]).limit(5); 
        res.json(getTop5);
    } catch (error) {
        res.json({ message: error });
    }
};

// * Finds all players sorting by rank
const playersRanked = async (req, res) => {
    try {
      const getPlayersRanked = await playersSchema
        .find()
        .sort({ matchesWon: -1, points: -1 });
      res.json(getPlayersRanked);
    } catch (error) {
      res.json({ message: error });
    }
  };

// * Update a player
const updatePlayer = async (req, res) => {
    // Get player id
    const playerId = req.params.id;

    // Create an update object with the fields to be updated
    const update = {};

    // Check each field and include it in the update object if it's provided in the request
    if (req.body.firstname) {
        update.firstname = req.body.firstname;
    }
    if (req.body.lastname) {
        update.lastname = req.body.lastname;
    }
    if (req.body.username) {
        update.username = req.body.username;
    }
    if (req.body.email) {
        update.email = req.body.email;
    }
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        update.password = hashPassword;
    }
    if (req.body.institute) {
        update.institute = req.body.institute;
    }

    try {
        const updatedPlayer = await playersSchema.updateOne(
            { _id: playerId },
            { $set: update }
        );
        res.status(200).json(updatedPlayer);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
};

// * Delete a player
const deletePlayer = async (req, res) => {
    try {
        const removePlayer = await playersSchema.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: `Deleted the player ${req.params.id}`,
            removePlayer: removePlayer,
        });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};


// * Add favorite players to user
const addFavoritePlayer = async (req, res) => {
    const playerId = req.params.id;
    const selectedPlayerId = req.body.selectedPlayerId;

    try {
        const loggedInPlayer = await playersSchema.findById(playerId);

        if (loggedInPlayer.favorites.includes(selectedPlayerId)) {
            return res.status(400).json({ error: 'Player already in favorites' });
        }
        if (playerId === selectedPlayerId) {
            return res.status(400).json({ error: 'Cannot add yourself as favorite' });
        }
        const addFavoritePlayer = await playersSchema.findOneAndUpdate(
            { _id: playerId },
            {
                $addToSet: {
                    favorites: selectedPlayerId
                }
            },
            { new: true }
        );
        res.status(201).json(addFavoritePlayer);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
}


// * Remove a player from favorites
const removeFavoritePlayer = async (req, res) => {
    const playerId = req.params.id;
    const removePlayerId = req.body.removePlayerId;
    
    const loggedInPlayer = await playersSchema.findById(playerId);

    try {
        if (!loggedInPlayer.favorites.includes(removePlayerId)) {
            return res.status(400).json({ error: 'Player is not in favorites' });
        }

        const removeFavoritePlayer = await playersSchema.updateOne(
            { _id: playerId },
            {
                $pull: {
                    favorites: removePlayerId,
                },
            }
        );
        res.status(200).json(removeFavoritePlayer);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
}


// * Get favorite players from the user
const getFavoritePlayers = async (req, res) => {
    const playerId = req.params.id;
    try {
        const favoritePlayers = await playersSchema.findById(playerId)
            .populate('favorites', '_id firstname lastname institute matchesWon points')
            .sort([
            ["matchesWon", -1],
            ["points", -1],
        ]);
        res.json(favoritePlayers);
    } catch (error) {
        res.json({ message: error });
    }
}


module.exports = {
    getAllPlayers,
    playersLength,
    getOnePlayer,
    getTopPlayers,
    playersRanked,
    updatePlayer,
    deletePlayer,
    addFavoritePlayer,
    removeFavoritePlayer,
    getFavoritePlayers
};
