import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRoutes from "./routes/user/userRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth/authRoutes.js";
import parcelRoutes from "./routes/parcel/parcelRoutes.js";
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", parcelRoutes);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "API endpoint does not exist",
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
