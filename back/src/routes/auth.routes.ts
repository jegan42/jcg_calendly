// src/routes/auth.routes.ts
import { Router } from "express";
import passport from "passport";
import { requireJWTAuth } from "../middleware/jwtAuth";
import { User } from "../types/interface";

const router = Router();

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/auth/google",
    }),
    (req, res) => {
        const user = req.user as User;
        const token = user.token;

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax", //"strict",
            maxAge: 60 * 60 * 1000,
        });

        res.json({
            success: true,
            token,
            user,
            message: "Successful login with Google in auth",
        });
    }
);

router.get("/me", requireJWTAuth, (req, res) => {
    res.json({ user: req.user });
});

router.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/");
});

export default router;
