const matchSchema = require('../schemas/matchSchema')
const newMatchSchema = require('../schemas/newMatchSchema')
const playersSchema = require('../schemas/playersSchema')


// * Find all matches
const getAllMatches = async (req, res) => {
    try {
        const showMatches = await matchSchema.find()
        .populate('players.player1', '_id firstname lastname username')
        .populate('players.player2', '_id firstname lastname username')
        .populate('winner', '_id firstname lastname username')
        .sort([
            ["date", -1]
           
          ]);
        res.json(showMatches);
    } catch (error) {
        console.log(error.message);
        res.json({ message: error });
    }
}


// * Find all matches - length
const matchesLength = async (req, res) => {
    try {
        const showMatches = await matchSchema.find();
        let matchesLength = showMatches.length; // To get a total number of all matches in the db
        res.json(matchesLength);
    } catch (error) {
        res.json({ message: error });
    }
};


// * Find one match 
const getOneMatch = async (req, res) => {
    try {
        const showMatch = await matchSchema.find({ _id: req.params.id })
        .populate('players.player1', '_id firstname lastname username')
        .populate('players.player2', '_id firstname lastname username')
        .populate('winner', '_id firstname lastname username')
        res.json(showMatch);
    } catch (error) {
        console.log(error.message);
        res.json({ message: error });
    }
}

// * Create new match with only the selected players id and match id
const newMatch = async (req, res) => {
    try {
        let player1 = req.body.player1;
        let player2 = req.body.player2;

        const newMatch = await newMatchSchema.create({
            players: {
                player1: player1,
                player2: player2,
            }
        });

        res.status(201).json(newMatch);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
}

// * Populate the created match with the new match results. 
const populateNewMatch = async (req, res) => {
    try {
        let winner = req.body.winner
        let player1 = req.body.players.player1
        let player2 = req.body.players.player2

        // If the winner is 'player1', then player1 gets 3 points, and the loser gets 1 point.
        // The winner also get an increment at matches won.
        if (winner === player1) {
            console.log("incrementing");
            await playersSchema.findOneAndUpdate({ _id: player1 }, { $inc: { points: 3, matchesWon: 1 } });
            await playersSchema.findOneAndUpdate({ _id: player2 }, { $inc: { points: 1 } });
            console.log("player 1 wins");
        
        // Else, 'player2' get 3 points, and the looser get 1 point.
        } else {
            await playersSchema.findOneAndUpdate({ _id: player1 }, { $inc: { points: 1 } });
            await playersSchema.findOneAndUpdate({ _id: player2 }, { $inc: { points: 3, matchesWon: 1 } });
            console.log("player 2 wins");
        }

        // Update match to database
        const populateNewMatch = await matchSchema.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    players: {
                        player1: player1,
                        player2: player2,
                    },
                    timestamps: {
                        startTime: req.body.timestamps.startTime,
                        endTime: req.body.timestamps.endTime

                    },
                    duration: req.body.duration,
                    setResults: req.body.setResults,
                    player1Sets: req.body.player1Sets,
                    player2Sets: req.body.player2Sets,
                    overallPoints: req.body.overallPoints,
                    winner: winner,
                    finished: req.body.finished
                }
            }
        );
        res.status(201).json(populateNewMatch)
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error.message)
    }
}

// * Update a match
const updateMatch = async (req, res) => {
    try {
        let player1 = req.body.players.player1
        let player2 = req.body.players.player2
        let player1Sets = req.body.player1Sets
        let player2Sets = req.body.player2Sets
        console.log("PLAYER1", player1)
        console.log(req.body);

        // Check if player1 exists
        const existingPlayer1 = await playersSchema.findById(player1)
        if (!existingPlayer1) {
            // Player1 does not exist, set it to null
            player1 = null;
        }

        // Check if player2 exists
        const existingPlayer2 = await playersSchema.findById(player2)
        if (!existingPlayer2) {
            // Player2 does not exist, set it to null
            player2 = null;
        }

        // Update only the specified fields
        const updatedMatch = await matchSchema.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    player1Sets: player1Sets,
                    player2Sets: player2Sets,
                    overallPoints: req.body.overallPoints
                }
            },
            { new: true }
        )
        .populate('players.player2', '_id firstname lastname username')
        .populate('players.player1', '_id firstname lastname username')
        .populate('winner', '_id firstname lastname username');

        // Calculate the new winner based on the updated score values
        // Set newWinner variable
        let newWinner = null;
        // Check if the player1 score is bigger then player2 score
        if (player1Sets > player2Sets) {
            // Set new winner to player 1
            newWinner = player1;
            // If player 1 is not null, then update points and matches won.
            if (player1 !== null) {
                await playersSchema.findOneAndUpdate({ _id: player1 }, { $inc: { points: 3, matchesWon: 1 } });
            }
            // If player 2 is not null, then undate points.
            if (player2 !== null) {
                await playersSchema.findOneAndUpdate({ _id: player2 }, { $inc: { points: 1 } });
            }
            console.log("player 1 wins");

        } else if (player2 !== null && player2Sets > player1Sets) {
            // Set new winner to player 2
            newWinner = player2;
            // If player 2 is not null, then update points and matches won.
            if (player2 !== null) {
                await playersSchema.findOneAndUpdate({ _id: player2 }, { $inc: { points: 3, matchesWon: 1 } });
            }
            // If player 1 is not null, then undate points.
            if (player1 !== null) {
                await playersSchema.findOneAndUpdate({ _id: player1 }, { $inc: { points: 1 } });
            }
            console.log("player 2 wins")
        }

        // Update the winner field in the match document
        await matchSchema.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    winner: newWinner
                }
            }
        )

        res.status(200).json(updatedMatch);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }

}

// * Delete a match
const deleteMatch = async (req, res) => {
    try {
        let winner = req.body.winner
        let player1 = req.body.player1
        let player2 = req.body.player2

        // If you delete a match, the if-statement makes sure the players get their points removed.
        // The winner of the match also get their match-points deleted.  
        if (player1 && winner === player1) {
            await playersSchema.findOneAndUpdate({ _id: player1 }, { $inc: { points: -3, matchesWon: -1 } });
            
            if (player2) {
                await playersSchema.findOneAndUpdate({ _id: player2 }, { $inc: { points: -1 } })
            }

        } else if (player2 && winner === player2) {
            await playersSchema.findOneAndUpdate({ _id: player2 }, { $inc: { points: -3, matchesWon: -1 } });
            
            if (player1) {
                await playersSchema.findOneAndUpdate({ _id: player1 }, { $inc: { points: -1 } })
            }
        }
        // Delete match from db
        const deleteMatch = await matchSchema.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: `Deleted the match ${req.params.id}`, "deleteMatch": deleteMatch })

    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error })
    }
}

module.exports = { getAllMatches, matchesLength, getOneMatch, newMatch, populateNewMatch, updateMatch, deleteMatch }
