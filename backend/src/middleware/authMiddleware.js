import jwt from "jsonwebtoken";
import User from "../models/user/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract user ID from decoded token
    // generateToken creates tokens with { id: userId }, so decoded should be { id: ... }
    // Handle both old tokens (with full object) and new tokens (with just id)
    let userId;

    if (typeof decoded === "object" && decoded !== null) {
      // New token format: { id: "..." }
      // Old token format: { id: "...", role: "...", email: "..." }
      if (decoded.id) {
        // Explicitly convert to string to avoid any type issues
        userId = String(decoded.id);
      } else {
        throw new Error("Token missing user ID");
      }
    } else if (typeof decoded === "string") {
      userId = decoded;
    } else {
      throw new Error("Invalid token format");
    }

    // Validate userId is a valid string before using it
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid user ID format");
    }

    // Fetch user from database (includes agent via discriminator)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found",
      });
    }

    // Attach full user object with role information
    req.user = user;

    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    return res.status(401).json({
      status: "error",
      message: "Unauthorized or Invalid token",
    });
  }
};

// Role-based middleware helpers
export const isUser = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    next();
  } else {
    return res.status(403).json({
      status: "error",
      message: "Access denied: User role required",
    });
  }
};

export const isAgent = (req, res, next) => {
  if (req.user && req.user.role === "agent") {
    next();
  } else {
    return res.status(403).json({
      status: "error",
      message: "Access denied: Agent role required",
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      status: "error",
      message: "Access denied: Admin role required",
    });
  }
};

// Middleware to allow multiple roles
export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(403).json({
        status: "error",
        message: `Access denied: One of these roles required: ${roles.join(
          ", "
        )}`,
      });
    }
  };
};
