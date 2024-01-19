import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
const app = express()
const port = process.env.PORT || 3000
import cors from 'cors'
import connectDB from './db/db.js'

import userRouter from './routes/user.js'
import roomsRouter from './routes/rooms.js'


// Middlewares
app.use(cors());
app.use(express.json());


// Home route 
app.get('/', (req, res) => {
    res.send("Hello Server!")
})
// routes
app.use("/users", userRouter);
app.use('/rooms', roomsRouter);


// Error Handling Middleware
app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong!";
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage
    });
});




// connectDB function called - MongoDB connection 
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`)
    })
})