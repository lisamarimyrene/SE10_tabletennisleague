const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

// * Refresh Token schema
const refreshTokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    generatedTokenString: {
        type: String,
        required: true,
    },
    expireDate: {
        type: Date,
        required: true,
    }
});
{ collection: 'TableTennisDB' }
module.exports = mongoose.model('RefreshToken', refreshTokenSchema, 'refreshToken')