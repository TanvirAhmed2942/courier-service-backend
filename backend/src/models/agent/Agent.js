import mongoose from "mongoose";
import User from "../user/User.js";

const agentSchema = new mongoose.Schema({
  vehicle: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
});

export default User.discriminator("agent", agentSchema);
