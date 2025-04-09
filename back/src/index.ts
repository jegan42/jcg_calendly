// src/index.ts
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";

import {
    authRoutes,
    calendarRoutes,
    dashboardRoutes,
    eventRoutes,
    homeRoutes,
    userRoutes,
} from "./routes";

import "./auth/google";
import { limiter } from "./middleware/secure";
import process from "node:process";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

// Middleware to parse JSON and URL-encoded requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to log HTTP requests
app.use(morgan("dev"));

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "https:", "data:"],
            scriptSrc: ["'self'", "https://apis.google.com"], // or other necessary third-party domains
            styleSrc: ["'self'", "'unsafe-inline'"], // avoid if possible
        },
    })
);

// Route to get the CSRF token
// app.get("/csrf-token", (req, res) => {
//     // Send the CSRF token to the frontend
//     res.json({ csrfToken: req.csrfToken() });
// });

// Manage sessions
// app.use(
//     session({
//         secret: process.env.SECRET_SESSION_KEY ?? "ultraSecretKey",
//         resave: false,
//         saveUninitialized: true,
//         cookie: {
//             secure: process.env.NODE_ENV === "production", // Ensure cookies are sent only via HTTPS in production
//             httpOnly: true, // Prevent access to cookies via JavaScript
//             maxAge: 3600000,
//         },
//     })
// );
app.use(passport.initialize());

// If using sessions with Passport.js
// app.use(passport.session());

app.use("/", limiter, homeRoutes);
app.use("/auth", limiter, authRoutes);
app.use("/calendar", limiter, calendarRoutes);
app.use("/dashboard", limiter, dashboardRoutes);
app.use("/events", limiter, eventRoutes);
app.use("/user", limiter, userRoutes);

app.use(
    (
        err: Error,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
    ) => {
        console.error(err.stack);
        res.status(500).json({ message: "Unexpected server error" });
    }
);

app.use((_req: express.Request, res: express.Response) => {
    res.status(404).json({ message: "Route not found" });
});

// Test route for session logout
// app.get("/logout", (req, res) => {
//     req.logout((err) => {
//         if (err) return res.status(500).json({ message: "Logout error" });
//         req.session.destroy(() => {
//             res.clearCookie("connect.sid"); // or another name if renamed
//             res.redirect("/");
//         });
//     });
// });

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
