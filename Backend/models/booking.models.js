import mongoose from "mongoose";

// Bookinngs Schema
const bookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  // phoneNumber: {
  //   type: Number,
  //   required: true,
  // },
  checkindate: {
    type: Date,
    required: true,
  },
  checkoutdate: {
    type: Date,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  children: {
    type: Number,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
