import express from 'express'
import roomController from '../controllers/rooms.contoller.js';
import { verifyAdmin } from '../middlewares/verifyToken.js';

// Express Router 
const router = express.Router();


// Room routes
router.get("/", roomController.handleGetAllRooms)
router.get("/:id", roomController.handleGetRoomById)
router.post("/", verifyAdmin, roomController.handlePostRooms)
router.put("/:id", verifyAdmin, roomController.handleUpdateRoomsById)
router.delete("/:id", verifyAdmin, roomController.handleDeleteRoomsById)



export default router;