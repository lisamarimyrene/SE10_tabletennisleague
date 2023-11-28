const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const playersSchema = require('./playersSchema');

// * Populate the played match in the new match - schema
const matchSchema = new mongoose.Schema({
    // Players by id
    players: {
        player1: {
            type: String,
            ref: 'Player',
            // autopopulate: true, // gets all information from the players id
        },
        player2: {
            type: String,
            ref: 'Player',
            // autopopulate: true,
        }
    },
    // The date the match took place
    date: {
        type: Date,
        required: true,
        default: Date.now,
        get: (date) => date.toLocaleDateString("sp-MX") // Formatting the date string
    },
    // Start- and end time
    timestamps: {
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        }
    },
    // Match duration
    duration: {
        type: String,
        required: true,
        default: 0
    },
    // Sets results
    setResults: {
        type: Array,
        required: true
    },
    // Player 1 score
    player1Sets: {
        type: Number,
        required: true
    },
    // Player 2 score
    player2Sets: {
        type: Number,
        required: true
    },
    // Best of 5 matches
    overallPoints: {
        type: String,
        required: true
    },
    // Winner
    winner: {
        type: String,
        ref: 'Player',
    },
    // Set match to finished
    finished: {
        type: Boolean,
        required: true
    }
}, { strictPopulate: false }); // Set strictPopulate to false)
{ collection: 'TableTennisDB' }
module.exports = mongoose.model('Match', matchSchema, 'matches')