// src/middleware/secure.ts
import csrf from "csurf";

// Init CSRF protection
// This middleware is used to protect against CSRF attacks
// It uses a cookie to store the CSRF token
export const csrfProtection = csrf({ cookie: true });

export const csrfErrorHandler = (err: any, req: any, res: any, next: any) => {
    if (err.code === "EBADCSRFTOKEN") {
        res.status(403).json({ message: "Invalid CSRF token" });
    } else {
        next(err);
    }
};
