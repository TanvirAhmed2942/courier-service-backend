import express from "express";
import { createParcel } from "../../controllers/parcel/parcelController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create-parcel", authMiddleware, createParcel);

export default router;
