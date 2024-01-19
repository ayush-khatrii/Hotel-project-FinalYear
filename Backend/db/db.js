import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';

// DB URL
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

export default connectDB;