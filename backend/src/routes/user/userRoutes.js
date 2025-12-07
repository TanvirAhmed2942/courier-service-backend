import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../controllers/user/userController.js";
const router = express.Router();

router.get("/users", authMiddleware, getAllUsers);

router.post("/users", createUser);

router.patch("/users/:id", authMiddleware, updateUser);

router.delete("/users/:id", authMiddleware, deleteUser);

export default router;
