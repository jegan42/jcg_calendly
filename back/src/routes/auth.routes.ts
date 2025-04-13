// src/routes/auth.routes.ts

// 1. External modules
import { Router, Request, Response } from "express";
import passport from "passport";

// 2. Custom middleware and types
import { requireJWTAuth } from "../middleware/jwtAuth";
import { User } from "../types/interface";
import { getUserById } from "../lib/supabaseQueries";

// 3. Initialize the router
const router = Router();

// 4. Google OAuth route - redirect user to Google for authentication
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

// 5. Google OAuth callback - handle response from Google
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/auth/google", // If auth fails, redirect to try again
    }),
    (req: Request, res: Response) => {
        const user = req.user as User;
        const token = user.token;

        // Send JWT token as HTTP-only cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // HTTPS only in prod
            sameSite:
                (process.env.COOKIE_SAMESITE as "none" | "lax" | "strict") ??
                "none",
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        // Redirect to dashboard on frontend after login
        const clientURL = process.env.CLIENT_URL ?? "http://0.0.0.0:3000";
        res.redirect(`${clientURL}/dashboard`);
    }
);

// 6. Authenticated route to get current user's data
router.get(
    "/me",
    requireJWTAuth,
    async (req: Request, res: Response): Promise<void> => {
        const reqUser = req.user as User;

        // Fetch user from Supabase database
        const user = await getUserById(reqUser.id);

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        res.status(200).json({ success: true, user });
    }
);

// 7. Logout route - clears JWT cookie
router.get("/logout", (_req: Request, res: Response) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:
            (process.env.COOKIE_SAMESITE as "none" | "lax" | "strict") ??
            "none",
    });

    res.redirect("/");
});

// 8. Export the router
export default router;
