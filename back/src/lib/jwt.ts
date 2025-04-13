// src/lib/jwt.ts
import jwt from "jsonwebtoken";

const JWT_SECRET =
    process.env.JWT_SECRET ?? "$A9qQvTzNw7s2VpZ!J@4g8L*Zx8#d2P&1";

// Generate a JWT token with a payload and expiration time
export const generateJWT = (payload: object) =>
    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

// Verify a JWT token and return the decoded payload
export const verifyJWT = (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
        if (decoded?.exp) {
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp < currentTime) {
                return null;
            }
        }
        return decoded;
    } catch {
        return null;
    }
};
