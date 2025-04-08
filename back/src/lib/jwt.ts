// src/lib/jwt.ts
import jwt from "jsonwebtoken";

const JWT_SECRET =
    process.env.JWT_SECRET ?? "$A9qQvTzNw7s2VpZ!J@4g8L*Zx8#d2P&1";

export const generateJWT = (payload: object) => 
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};
