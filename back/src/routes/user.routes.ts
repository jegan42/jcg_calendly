// src/routes/user.routes.ts
import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { registerUser } from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth";
import { User } from "../types/interface";
import { supabase } from "../lib/supabaseClient";
import { csrfProtection } from "../middleware/secure";

const router = Router();

router.post("/register", registerUser, csrfProtection);

// Route to update the user profile
router.put(
    "/me",
    requireAuth,
    csrfProtection,
    [
        // Validation for 'name' and 'avatar' fields
        check("name")
            .isString()
            .withMessage("Name must be a string")
            .notEmpty()
            .withMessage("Name is required"),
        check("avatar")
            .isURL()
            .withMessage("Avatar must be a valid URL")
            .optional(), // Avatar is optional
    ],
    async (req: Request, res: Response) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If there are errors, return a response with the errors
            res.status(400).json({ errors: errors.array() });
            return;
        }

        // If no validation errors, process the update
        const { name, avatar } = req.body;
        const user = req.user as User;

        try {
            // Update user information
            const { data, error } = await supabase
                .from("users")
                .update({ name, avatar })
                .eq("id", user.id);

            if (error) {
                res.status(400).json({
                    message: "Error updating profile",
                    error,
                });
                return;
            }

            res.json(data);
        } catch (err) {
            res.status(500).json({
                message: "Server error",
                error:
                    err instanceof Error
                        ? err.message
                        : "An unknown error occurred",
            });
        }
    }
);

export default router;
