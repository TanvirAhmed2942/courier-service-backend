import User from "../../models/user/User.js";
import Agent from "../../models/agent/Agent.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../lib/utls.js";
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      role,
      vehicle,
      vehicleNumber,
    } = req.body;

    // Basic validation
    if (!name || !email || !password || !phone || !address || !role) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    // Agent-specific validation
    if (role === "agent") {
      if (!vehicle || !vehicleNumber) {
        return res.status(400).json({
          status: "error",
          message: "Vehicle and vehicle number are required for agents",
        });
      }
    }

    // Check for existing email (works for both User and Agent due to discriminator)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Email already in use",
      });
    }

    // Check for existing phone
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({
        status: "error",
        message: "Phone number already in use",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        status: "error",
        message: "Password must be at least 6 characters long",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Handle address - convert string to array format if needed
    let addressArray = address;
    if (typeof address === "string") {
      const parts = address.split(",").map((part) => part.trim());
      addressArray = [
        {
          street: parts.slice(0, -1).join(", "),
          city: parts[parts.length - 1] || "",
          zip: "",
        },
      ];
    }

    // Create user or agent based on role
    let newUser;
    if (role === "agent") {
      newUser = await Agent.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address: addressArray,
        vehicle,
        vehicleNumber,
      });
    } else {
      // For regular users and admins, use base User model
      // Use constructor directly to avoid discriminator lookup issues
      const userData = {
        name,
        email,
        password: hashedPassword,
        phone,
        address: addressArray,
        role: role, // Set role explicitly
      };

      // Use new User() and save() instead of create() to avoid discriminator lookup
      newUser = new User(userData);
      await newUser.save();
    }

    const token = await generateToken(newUser._id, res);
    res.status(201).json({
      status: "success",
      message: `${role === "agent" ? "Agent" : "User"} created successfully`,
      data: newUser,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error registering user",
      error: error.message,
    });
    console.log("Error registering user (register): ", error);
  }
};

export const login = async (req, res) => {
  console.log("Logging in user: ", req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Email not registered",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: "error",
        message: "Invalid password",
      });
    }
    const token = await generateToken(existingUser._id, res);
    res.status(200).json({
      status: "success",
      message: `${
        existingUser.role === "agent" ? "Agent" : "User"
      } logged in successfully`,
      user: existingUser,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error logging in user",
      error: error.message,
    });
    console.log("Error logging in user (login): ", error);
  }
};
