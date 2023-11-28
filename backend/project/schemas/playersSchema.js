const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

// * Creating the players schema
const playersSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true, 'please enter your firstname']
    },
    lastname:{
        type:String,
        required:[true, 'please enter your lastname']
    },
    username: {
        type:String,
        unique:true,
        required:[true, 'please create username']
    },
    password: {
        type:String,
        required: true,
        minLength:6
    },
    email:{
        type:String,
        required:[true, 'please enter your email'],
        lowercase:true,
        unique:true,
    },

    role: {
        type:String,
        enum: ['user','admin'],
        default: 'user'
    },

    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    }],

    institute:{
        type:String,
        required:[true, 'please enter your institute']
    },
    matchesWon: {
        type:Number,
        default:0
    },
    points:{
        type:Number,
        default:0
    }
})
{collection: 'TableTennisDB'}
module.exports = mongoose.model('Player', playersSchema, 'players')