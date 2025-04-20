// src/middleware/csrf.ts
import csrf from "csurf";

// CSRF protection middleware with secure cookie
export const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        secure: true, // Render is HTTPS, so required
        sameSite: "none", // Important when using cross-origin (front/back separated)
    },
});

export const csrfErrorHandler = (err: any, req: any, res: any, next: any) => {
    if (err.code === "EBADCSRFTOKEN") {
        return res.status(403).json({ message: "Invalid CSRF token" });
    }
    next(err);
};
