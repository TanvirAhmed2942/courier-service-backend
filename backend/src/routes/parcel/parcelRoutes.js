import express from "express";
import {
  createParcel,
  getParcels,
  getParcel,
  updateParcel,
  cancelParcel,
  assignAgent,
} from "../../controllers/parcel/parcelController.js";
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
router.get("/get-parcels", authMiddleware, isUser, getParcels);
router.get("/get-parcel/:id", authMiddleware, isUser, getParcel);
router.put("/update-parcel/:id", authMiddleware, isUser, updateParcel);
router.patch("/cancel-parcel/:id", authMiddleware, isUser, cancelParcel);

//admin
router.patch("/assign-agent/:id", authMiddleware, isAdmin, assignAgent);

export default router;
