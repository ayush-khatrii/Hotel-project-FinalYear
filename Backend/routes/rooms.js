import express from 'express'
import roomController from '../controllers/rooms.contoller.js';

// Express Router 
const router = express.Router();

// All routes
router
    .route('/')
    .get(roomController.handleGetAllRooms)
    .post(roomController.handlePostRooms)

//Specific Routes
router
    .route('/:id')
    .get(roomController.handleGetRoomById)
    .put(roomController.handleUpdateRoomsById)
    .delete(roomController.handleDeleteRoomsById)


export default router;