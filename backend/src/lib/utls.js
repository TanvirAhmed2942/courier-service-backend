import jwt from "jsonwebtoken";
export const generateToken = async (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

export const verifyToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const decodeToken = async (token) => {
  return jwt.decode(token);
};
