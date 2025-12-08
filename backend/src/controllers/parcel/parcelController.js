import Parcel from "../../models/parcel/Parcel.js";

export const createParcel = async (req, res) => {
  console.log("Creating parcel: ", req.body);
  try {
    const { receiver, parcelType, parcelDescription, travelRoute } = req.body;

    // Basic validation
    if (!receiver || !parcelType || !parcelDescription || !travelRoute) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    // Validate receiver structure
    if (!receiver.name || !receiver.phone || !receiver.address) {
      return res.status(400).json({
        status: "error",
        message: "Receiver must have name, phone, and address",
      });
    }

    // Validate travelRoute structure
    if (!travelRoute.pickupLocation || !travelRoute.dropoffLocation) {
      return res.status(400).json({
        status: "error",
        message: "Travel route must have pickupLocation and dropoffLocation",
      });
    }

    // Create parcel
    const newParcel = await Parcel.create({
      sender: req.user._id,
      receiver,
      parcelType,
      parcelDescription,
      travelRoute,
    });
    res.status(201).json({
      status: "success",
      message: "Parcel created successfully",
      data: newParcel,
    });
    console.log("Parcel created successfully (createParcel): ", newParcel);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error creating parcel",
      error: error.message,
    });
    console.log("Error creating parcel (createParcel): ", error);
  }
};

export const getParcels = async (req, res) => {
  console.log("Getting parcels: ", req.body);
  try {
    const parcels = await Parcel.find({ sender: req.user._id });
    res.status(200).json({
      status: "success",
      message: "Parcels fetched successfully",
      data: parcels,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching parcels",
      error: error.message,
    });
    console.log("Error fetching parcels (getParcels): ", error);
  }
};

export const getParcel = async (req, res) => {
  console.log("Getting parcel: ", req.params.id);
  try {
    const parcel = await Parcel.findById(req.params.id);
    if (!parcel) {
      return res.status(404).json({
        status: "error",
        message: "Parcel not found",
      });
    }
    if (!req.user._id.equals(parcel.sender)) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: You are not the sender of this parcel",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Parcel fetched successfully",
      data: parcel,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching parcel",
      error: error.message,
    });
    console.log("Error fetching parcel (getParcel): ", error);
  }
};

export const updateParcel = async (req, res) => {
  console.log("Updating parcel: ", req.params.id);

  try {
    const parcel = await Parcel.findById(req.params.id);
    if (!parcel) {
      return res.status(404).json({
        status: "error",
        message: "Parcel not found",
      });
    }
    if (!req.user.id.toString() === parcel.sender.toString()) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: You are not the sender of this parcel",
      });
    }
    const updatedParcel = await Parcel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      message: "Parcel updated successfully",
      data: updatedParcel,
    });
    console.log("Parcel updated successfully (updateParcel): ", updatedParcel);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error updating parcel",
      error: error.message,
    });
    console.log("Error updating parcel (updateParcel): ", error);
  }
};

export const cancelParcel = async (req, res) => {
  console.log("Cancelling parcel: ", req.params.id);
  try {
    const parcel = await Parcel.findById(req.params.id);
    if (!parcel) {
      return res.status(404).json({
        status: "error",
        message: "Parcel not found",
      });
    }
    if (!req.user.id.toString() === parcel.sender.toString()) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: You are not the sender of this parcel",
      });
    }
    const cancelledParcel = await Parcel.findByIdAndUpdate(
      req.params.id,
      {
        deliveryStatus: "cancelled",
      },
      {
        new: true,
      }
    );
    console.log(
      "Parcel cancelled successfully (cancelParcel): ",
      cancelledParcel
    );
    res.status(200).json({
      status: "success",
      message: "Parcel cancelled successfully",
      data: cancelledParcel,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error cancelling parcel",
      error: error.message,
    });
    console.log("Error cancelling parcel (cancelParcel): ", error);
  }
};
