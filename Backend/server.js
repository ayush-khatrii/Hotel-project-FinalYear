import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
const app = express()
const port = process.env.PORT || 3000
import cors from 'cors'
import connectDB from './db/db.js'

import cookieParser from 'cookie-parser';


import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import roomsRouter from './routes/rooms.js'
import reviewRouter from './routes/review.js'

// Middlewares
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());


// Home route 
app.get('/', (req, res) => {
    res.send("Hello Server!")
});
// routes
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use('/rooms', roomsRouter);
app.use('/reviews', reviewRouter);


// connectDB function called - MongoDB connection 
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`)
    })
})