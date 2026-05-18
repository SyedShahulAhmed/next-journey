import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET");
}

interface TokenPayload {
  userId: string;
  email: string;
}

export function signToken(payload: TokenPayload) {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
