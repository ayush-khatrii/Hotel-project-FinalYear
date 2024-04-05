import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amenities: [
    {
      type: String,
    },
  ],
  roomName: {
    type: String,
  },
  roomImages: [
    {
      type: String,
      required: true,
    },
  ],

  numberofbeds: {
    type: Number,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isBooked: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
