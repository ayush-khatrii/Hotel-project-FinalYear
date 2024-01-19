import express from 'express'
import userController from '../controllers/user.contoller.js';

// Express Router 
const router = express.Router();

// All routes
router
    .route('/')
    .get(userController.handleGetAllUsers)
    .post(userController.handlePostUsers)

//Specific Routes
router
    .route('/:id')
    .get(userController.handleGetUserById)
    .put(userController.handleUpdateUsersById)
    .delete(userController.handleDeleteUsersById)

export default router;