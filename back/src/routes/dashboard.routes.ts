// src/routes/dashboard.routes.ts
import { Router, Request, Response } from "express";
import escape from "escape-html";
import { requireJWTAuth } from "../middleware/jwtAuth";

const router = Router();

router.get("/", requireJWTAuth, (req: Request, res: Response) => {
    console.log("Logged-in user: ", req.user);

    // Check if the "auth_success" parameter is present in the URL
    const successMessage = req.query.auth_success
        ? "Successfully logged in with Google on the dashboard!"
        : null;

    // Send the HTML response with the success message if present
    res.send(`
        <h1>Welcome to your dashboard</h1>
        <p>Logged-in user: ${escape(JSON.stringify(req.user))}</p>
        ${
            successMessage
                ? `<div style="color: green; font-weight: bold;">${escape(
                      successMessage
                  )}</div>`
                : ""
        }
    `);
});

export default router;
