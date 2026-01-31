const { default: mongoose } = require("mongoose");

async function dbConnection() {
    
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("DB SUCCESFULLY CONNECTED")
        
    } catch (err) {
        console.log(err.message);
        throw new Error("DB connection failed")
        
    }
}
module.exports = dbConnection