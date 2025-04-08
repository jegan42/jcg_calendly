// src/routes/calendar.routes.ts
import { Router, Request, Response } from "express";
import { checkOverlappingEvents } from "../services/event.service";
import { User } from "../types/interface";
import { csrfProtection } from "../middleware/secure";
import { requireJWTAuth } from "../middleware/jwtAuth";

const router = Router();

router.post(
    "/",
    requireJWTAuth,
    csrfProtection,
    async (req: Request, res: Response) => {
        const { title, description, start_time, end_time, guests } = req.body;
        const user = req.user as User;

        try {
            const overlappingEvents = await checkOverlappingEvents(
                user.id,
                start_time,
                end_time
            );

            if (overlappingEvents.length > 0) {
                res.status(409).json({ message: "Time slot already booked" });
                return;
            }

            // If there is no overlap, create the event.
            // Here you call the event creation logic, which can be a service, as in the previous file.
            // createEvent...

            res.status(201).json({ message: "Event created successfully" });
        } catch (error) {
            res.status(400).json({
                message:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred",
            });
        }
    }
);

// Additional routes can be added here...

export default router;
