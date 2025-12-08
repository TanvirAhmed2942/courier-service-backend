import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: [
      {
        street: {
          type: String,
          required: false,
        },
        city: {
          type: String,
          required: true,
        },
        zip: {
          type: String,
          required: false,
        },
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin", "agent"],
      default: "user",
    },
  },
  {
    discriminatorKey: "role",
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
