import mongoose from "mongoose";
import User from "../user/User.js";
const options = { discriminatorKey: "role", timestamps: true };
const agentSchema = new mongoose.Schema(
  {
    vehicle: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
  },
  options
);

export default User.discriminator("agent", agentSchema);
