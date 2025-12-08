import express from "express";
import { createParcel } from "../../controllers/parcel/parcelController.js";
import {
  authMiddleware,
  isUser,
  isAgent,
  isAdmin,
  allowRoles,
} from "../../middleware/authMiddleware.js";
const router = express.Router();

//user
router.post("/create-parcel", authMiddleware, isUser, createParcel);

//admin
// router.post("/assign-agent", authMiddleware, isAdmin, assignAgent);

export default router;
