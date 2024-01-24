import express from 'express'
import userController from '../controllers/user.contoller.js';
import { verifyAdmin, verifyToken, verifyUser } from '../middlewares/verifyToken.js';
import userContoller from '../controllers/user.contoller.js';

// Express Router 
const router = express.Router();



router.get("/", verifyAdmin, userController.handleGetAllUsers)
router.get("/:id", verifyUser, userController.handleGetUserById)
router.put("/:id", verifyUser, userController.handleUpdateUsersById)
router.delete("/:id", verifyUser, userController.handleDeleteUsersById)



export default router;