// src/middleware/jwtAuth.ts
import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../lib/jwt";
import { supabase } from "../lib/supabaseClient";

// Middleware to check if the user is authenticated using JWT
export const requireJWTAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies.token;

    if (!token) {
        res.status(401).json({ message: "Missing token" });
        return;
    }

    const decoded = verifyJWT(token);
    if (!decoded) {
        res.status(403).json({ message: "Invalid token" });
        return;
    }

    try {
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", decoded.id)
            .single();

        if (error || !user) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid or expired token",
            error: (error as Error).message,
        });
        return;
    }
};
