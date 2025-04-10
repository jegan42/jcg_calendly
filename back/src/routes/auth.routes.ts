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

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: (["none", "lax", "strict"].includes(
                process.env.COOKIE_SAMESITE ?? ""
            )
                ? process.env.COOKIE_SAMESITE
                : "none") as "none" | "lax" | "strict",
            maxAge: 60 * 60 * 1000,
            domain: process.env.COOKIE_DOMAIN,
        });

        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.send(`
  <!DOCTYPE html>
  <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <title>Connexion réussie</title>
      <script>
        setTimeout(() => {
          window.location.href = "${process.env.CLIENT_URL}/dashboard";
        }, 1000);
      </script>
    </head>
    <body>
      <p>Connexion réussie. Redirection vers l'application...</p>
    </body>
  </html>
`);

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
