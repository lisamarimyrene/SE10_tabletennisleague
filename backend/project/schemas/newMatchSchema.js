const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const playersSchema = require('./playersSchema');

// * Creating a new match shema, with players and id
const newMatchSchema = new mongoose.Schema({
    // Players by id
    players: {
        player1: {
          type: String
        },
        player2: {
          type: String
        }
    },
    // The date the match took place
    date: {
        type: Date,
        required: true,
        default: Date.now,
        get: (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    },
    finished: {
        type: Boolean,
        default: false,
        required: true
    }
}, { strictPopulate: false }); // Set strictPopulate to false);
{ collection: 'TableTennisDB' }
module.exports = mongoose.model('newMatch', newMatchSchema, 'matches')