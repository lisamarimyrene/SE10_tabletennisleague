
// Set up mongoose
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
 
// Create connection
const dbconnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI)
    } catch (error) {
        console.log(error);
    }
}
module.exports = dbconnect;