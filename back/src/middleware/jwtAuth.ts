// src/middleware/jwtAuth.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../lib/jwt";

// Middleware to check if the user is authenticated using JWT
export const requireJWTAuth = (
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

    const payload = verifyJWT(token);
    if (!payload) {
        res.status(403).json({ message: "Invalid token" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid or expired token :" + (error as Error).message,
        });
        return;
    }
};
