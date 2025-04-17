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
    console.log(" ✅ requireJWTAuth / ✅ req.header received:", req.headers);
    console.log(" ✅ requireJWTAuth / ✅ req.cookies received:", req.cookies);
    console.log(" ✅ requireJWTAuth / ✅ req.body received:", req.body);
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies.token;
    console.log("🔍 Cookie reçu :", req.cookies);
    console.log("🔍 Authorization header :", req.headers.authorization);
    console.log(" ✅ requireJWTAuth / ✅ token received:", token);

    if (!token) {
        res.status(401).json({ message: "Missing token" });
        return;
    }

    const decoded = verifyJWT(token);
    console.log(" ✅ requireJWTAuth / ✅ decoded received:", decoded);
    if (!decoded?.id_google) {
        res.status(403).json({ message: "Invalid token" });
        return;
    }

    console.log(" ✅ ON EST PASSER / ✅ ");
    try {
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("id_google", decoded.id_google)
            .single();


            console.log(" ✅ USER / ✅ [", user, "]");
            console.log(" ✅ ERROR / ✅ [", error, "]");
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
