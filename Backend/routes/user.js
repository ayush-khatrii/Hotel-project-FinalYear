import express from "express";
import userController from "../controllers/user.contoller.js";
import {
  verifyAdmin,
  verifyUser,
  verifyUserOrAdmin,
} from "../middlewares/verifyToken.js";

// Express Router
const router = express.Router();

router.get("/", verifyAdmin, userController.handleGetAllUsers);
router.get("/:id", verifyUser, userController.handleGetUserById);
router.put("/:id", verifyUser, userController.handleUpdateUsersById);
router.delete("/:id", verifyUserOrAdmin, userController.handleDeleteUsersById);

export default router;
