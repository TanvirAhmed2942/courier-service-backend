import jwt from "jsonwebtoken";

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

    // attach user
    req.user = decoded;

    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    return res.status(401).json({
      status: "error",
      message: "Unauthorized or Invalid token",
    });
  }
};
