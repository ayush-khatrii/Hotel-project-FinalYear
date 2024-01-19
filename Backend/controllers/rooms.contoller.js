import Room from '../models/room.model.js'
// Get All Rooms
const handleGetAllRooms = async (req, res, next) => {
    try {
        const allRooms = await Room.find();
        res.status(200).json(allRooms);
    } catch (error) {
        next(error);
    }
};

// Get Rooms by ID
const handleGetRoomById = async (req, res, next) => {
    try {
        const roomId = req.params.id;
        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({ error: "Room not found!" });
        }
        res.status(200).json(room);
    } catch (error) {
        console.error("Error fetching room:", error);
        next(error);
    }
};


// Create Rooms
const handlePostRooms = async (req, res, next) => {
    const newRoom = new Room({
        roomType: req.body.roomType,
        price: req.body.price,
        description: req.body.description,
        ammenities: req.body.ammenities,
        roomName: req.body.roomName,
        roomImages: req.body.roomImages,
        numberofbeds: req.body.numberofbeds,
        isBooked: req.body.isBooked,
    });

    try {
        await newRoom.save();
        res.status(200).json({ message: "Room Successfully Created!", status: 200 })
    } catch (error) {
        next(error)
    }
}

// Update Room by ID
const handleUpdateRoomsById = async (req, res, next) => {
    const roomId = req.params.id;

    try {
        const updatedRoom = await Room.findByIdAndUpdate(roomId, { $set: req.body }, { new: true });
        if (!updatedRoom) {
            return res.status(404).json({ error: "Room not found!" });
        }
        return res.status(200).json({ message: "Room Updated Successfully" });

    } catch (error) {
        next(error);
    }
}

// Delete Room by ID
const handleDeleteRoomsById = async (req, res, next) => {
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if (!deletedRoom) {
            return res.status(404).json({ error: "Room not found" });
        }
        res.status(200).json({ message: "Room Deleted Successfully!", status: 200 });
    } catch (error) {
        next(error);
    }
};

export default {
    handleGetAllRooms,
    handleGetRoomById,
    handlePostRooms,
    handleUpdateRoomsById,
    handleDeleteRoomsById
}