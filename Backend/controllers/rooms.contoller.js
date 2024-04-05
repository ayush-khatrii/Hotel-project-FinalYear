import Room from "../models/room.model.js";

// Get All Rooms
const handleGetAllRooms = async (req, res, next) => {
  try {
    const allRooms = await Room.find().populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "username",
      },
      select: "comment rating",
    });

    res.status(200).json(allRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Rooms by ID
const handleGetRoomById = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findById(roomId).populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "username",
      },
      select: "comment rating",
    });

    if (!room) {
      return res.status(404).json({ error: "Room not found!" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Rooms
const handlePostRooms = async (req, res, next) => {
  const newRoom = new Room({
    roomType: req.body.roomType,
    price: req.body.price,
    description: req.body.description,
    amenities: req.body.amenities,
    roomName: req.body.roomName,
    roomImages: req.body.roomImages,
    numberofbeds: req.body.numberofbeds,
    isBooked: req.body.isBooked,
  });

  try {
    await newRoom.save();
    res
      .status(200)
      .json({ message: "Room Successfully Created!", status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Room by ID
const handleUpdateRoomsById = async (req, res, next) => {
  const roomId = req.params.id;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedRoom) {
      return res.status(404).json({ error: "Room not found!" });
    }
    return res.status(200).json({ message: "Room Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Room by ID
const handleDeleteRoomsById = async (req, res, next) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({ error: "Room not found" });
    }
    res
      .status(200)
      .json({ message: "Room Deleted Successfully!", status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  handleGetAllRooms,
  handleGetRoomById,
  handlePostRooms,
  handleUpdateRoomsById,
  handleDeleteRoomsById,
};
