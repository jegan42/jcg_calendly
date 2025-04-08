// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated?.()) return next();
    if (req.accepts("json")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    res.redirect("/auth/google");
};
