require("dotenv").config();
const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI;


// Below function for connecting to the mongo db databse (mongodb compass) with mongoose
const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log(`MongoDB connection successfull!`);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

module.exports = connectDB;