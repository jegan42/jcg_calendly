// src/supabase/functions/fnSupabase/jwt.ts
import { createJwt, isJwtValid, isJwtExpired, getJwtPayload } from "@popov/jst";
import { parse } from "@bearz/dotenv";

// Load and parse environment variables from a file or a string
const envContent = await Deno.readTextFile("./.env"); // You can also load a string directly
const env = parse(envContent);

// Retrieve the JWT secret from environment variables
const JWT_SECRET = env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
}

// Function to create JWT
export const createJWT = async (payload: Record<string, unknown>) => {
    // Use createJwt to generate the JWT
    return await createJwt(payload, JWT_SECRET);
};

// Function to verify JWT
export const verifyJWT = async (token: string) => {
    try {
        // Verify the validity of the JWT using isJwtValid
        const isValid = await isJwtValid(token, JWT_SECRET);

        if (!isValid) {
            return null; // Invalid token
        }

        // Extract the payload from the JWT if valid
        const payload = getJwtPayload(token);
        return payload;
    } catch (error) {
        console.error("Error verifying the JWT", error);
        return null; // In case of an error
    }
};

// Optional: Check if the JWT is expired
export const isJWTExpired = (token: string) => {
    return isJwtExpired(token); // Returns true if expired
};
