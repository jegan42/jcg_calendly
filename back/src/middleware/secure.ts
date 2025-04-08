// src/middleware/secure.ts
import rateLimit from "express-rate-limit";
import csrf from "csurf";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests by IP
});

// Init CSRF protection
// This middleware is used to protect against CSRF attacks
// It uses a cookie to store the CSRF token
export const csrfProtection = csrf({ cookie: true });
