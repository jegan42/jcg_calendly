// src/routes/auth.routes.ts
import { Router, Request, Response } from "express";
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
    (req: Request, res: Response) => {
        const user = req.user as User;
        const token = user.token;

        // Log the token to verify it's correct
        console.log("Token to set in cookie: ", token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            // domain: ".onrender.com",
            maxAge: 60 * 60 * 1000,
        });

        // Log the cookies after setting the cookie
        console.log("Cookies in response: ", res.getHeaders());

        // Add a small delay before redirecting to give the browser time to process the cookie
        setTimeout(() => {
            res.redirect(`${process.env.CLIENT_URL}/dashboard`);
        }, 1000);

        // old code
        // setTimeout(() => {
        //     res.redirect(`${process.env.CLIENT_URL}/dashboard`);
        // }, 2000); // délai de 2 secondes
        // res.json({
        //     success: true,
        //     token,
        //     user,
        //     message: "Successful login with Google in auth",
        // });
    }
);

router.get("/me", requireJWTAuth, (req: Request, res: Response) => {
    res.json({ user: req.user });
});

router.get("/logout", (_req: Request, res: Response) => {
    res.clearCookie("jwt");
    res.redirect("/");
});

export default router;
