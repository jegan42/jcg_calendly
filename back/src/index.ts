// src/index.ts
// 1. External modules
import dotenv from "dotenv";
dotenv.config(); // Call dotenv.config() to load environment variables

import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";

// 2. Custom middleware or utilities
import { limiter } from "./middleware/limiter";
import "./auth/google"; // Google authentication (import without assignment)

// 3. Application routes
import { authRoutes, eventRoutes, homeRoutes, notification } from "./routes";

// 4. Express application initialization
const app = express();

// Security configuration before any other processing
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "https:", "data:"],
            scriptSrc: ["'self'", "https://apis.google.com"],
            styleSrc: ["'self'", "'unsafe-inline'"],
        },
    })
);

// CORS: Allow requests from the frontend client
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// Middleware for parsing request bodies
app.use(express.json()); // For JSON requests
app.use(express.urlencoded({ extended: true })); // For form submissions
app.use(cookieParser()); // For cookie management

// HTTP request logging
app.use(morgan("dev"));

// Passport initialization for authentication
app.use(passport.initialize());

// Request rate limiting (to prevent brute force or DDoS attacks)
app.use(limiter);

// Application routes
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/user", notification);

// General error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Unexpected server error" });
});

// Route not found
app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});
