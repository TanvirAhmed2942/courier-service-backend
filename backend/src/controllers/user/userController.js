import User from "../../models/user/User.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching users",
      error: error.message,
    });
    console.log("Error fetching users (getAllUsers): ", error);
  }
};
export const createUser = async (req, res) => {
  console.log("Creating user: ", req.body);
  try {
    const { name, email, password, phone, address, role } = req.body;

    // Handle address - if it's a string, convert to array format
    let addressArray = address;
    if (typeof address === "string") {
      // Parse string address (e.g., "House 12, Road 5, Dhanmondi, Dhaka")
      const parts = address.split(",").map((part) => part.trim());
      addressArray = [
        {
          street: parts.slice(0, -1).join(", "), // Everything except last part
          city: parts[parts.length - 1] || "", // Last part as city
          zip: "",
        },
      ];
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      address: addressArray,
      role,
    });
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error creating user",
      error: error.message,
    });
    console.log("Error creating user (createUser): ", error);
  }
};

export const updateUser = async (req, res) => {
  console.log("Updating user: ", req.body);
  try {
    const { id } = req.params;
    const { name, email, password, phone, address, role } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, password, phone, address, role },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error updating user",
      error: error.message,
    });
    console.log("Error updating user (updateUser): ", error);
  }
};

export const deleteUser = async (req, res) => {
  console.log("Deleting user: ", req.params);
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error deleting user",
      error: error.message,
    });
    console.log("Error deleting user (deleteUser): ", error);
  }
};
