import jwt from "jsonwebtoken";

export function signToken(payload) {
  const JWT_SECRET = process.env.JWT_SECRET;
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  const JWT_SECRET = process.env.JWT_SECRET;
  return jwt.verify(token, JWT_SECRET);
}
