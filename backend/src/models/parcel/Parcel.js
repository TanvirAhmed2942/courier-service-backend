import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const parcelSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    parcelType: {
      type: String,
      required: true,
    },
    parcelWeight: {
      type: String,
      required: false,
    },
    parcelVolume: {
      type: String,
      required: false,
    },
    parcelDescription: {
      type: String,
      required: true,
    },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    travelRoute: {
      pickupLocation: {
        type: String,
        required: true,
      },
      dropoffLocation: {
        type: String,
        required: true,
      },
      travelTime: {
        type: Number,
        required: false,
      },
      travelDistance: {
        type: Number,
        required: false,
      },
      travelCost: {
        type: Number,
        required: false,
      },
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "picked_up", "in_transit", "delivered", "cancelled"],
      default: "pending",
    },
    trackingNumber: {
      type: String,
      unique: true,
      default: () => uuidv4(),
      autoGenerate: true,
    },
  },
  {
    timestamps: true,
  }
);

const Parcel = mongoose.model("Parcel", parcelSchema);
export default Parcel;
