import Parcel from "../../models/parcel/Parcel.js";
export const createParcel = async (req, res) => {
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
      sender: req.user.id,
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
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error creating parcel",
      error: error.message,
    });
    console.log("Error creating parcel (createParcel): ", error);
  }
};
