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
import { csrfErrorHandler, csrfProtection } from "./middleware/csrf";
import { requireJWTAuth } from "./middleware/jwtAuth";

// 3. Application routes
import {
    authRoutes,
    availabilityRoutes,
    eventBookingsRoutes,
    eventRoutes,
    homeRoutes,
    notificationRoutes,
    publicRoutes,
    recurringEventsRoutes,
    responseRoutes,
} from "./routes";

// 4. Express application initialization
const app = express();

// HTTP request logging
app.use(morgan("combined"));

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
app.use((req, res, next) => {
    console.log("📩 Incoming request:");
    console.log("  - URL:", req.originalUrl);
    console.log("  - Method:", req.method);
    console.log("  - Cookies:", req.cookies);
    console.log("  - Headers:", req.headers);
    next();
});

// HTTP request logging
app.use(morgan("dev"));

// Passport initialization for authentication
app.use(passport.initialize());

// Request rate limiting (to prevent brute force or DDoS attacks)
app.use(limiter);

// Application routes
app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/public", publicRoutes);

// 🔐 All availability routes require authentication
// CSRF protection middleware
app.use(requireJWTAuth);
app.use(csrfProtection);

// All routes below this point require authentication
// and CSRF protection
app.use("/availability", availabilityRoutes);
app.use("/event-bookings", eventBookingsRoutes);
app.use("/events", eventRoutes);
app.use("/notification", notificationRoutes);
app.use("/recurring", recurringEventsRoutes);
app.use("/response", responseRoutes);

app.use(csrfErrorHandler);

// General error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Unexpected server error" });
});

// Route not found
app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: "Route not found" });
});

// ➕ Event reminder scheduler
import { scheduleEventReminders } from "./cron/reminderScheduler";
scheduleEventReminders();

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});
