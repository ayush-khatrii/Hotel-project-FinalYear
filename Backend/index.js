import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT || 3000;
import cors from "cors";
import connectDB from "./db/db.js";

import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import roomsRouter from "./routes/rooms.js";
import reviewRouter from "./routes/review.js";
import checkoutRouter from "./routes/checkout.js";
import bookingRouter from "./routes/booking.js";
import contactRouter from "./routes/contact.js";
import Razorpay from "razorpay"

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Middlewares
const corsOptions = {
  origin: ["https://marutihotel.netlify.app", "http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Hello Server!");
});

// routes
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/rooms", roomsRouter);
app.use("/reviews", reviewRouter);
app.use("/checkout", checkoutRouter);
app.use("/bookings", bookingRouter);
app.use("/contact", contactRouter);

// get key 
app.get("/key", (req, res) => {
  try {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// connectDB function called - MongoDB connection
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
  });
});
