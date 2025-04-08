// src/routes/event.routes.ts
import { Router, Request, Response } from "express";
import { User } from "../types/interface";
import {
    createEvent,
    getUserEvents,
    updateEvent,
    deleteEvent,
    validateEvent,
} from "../services/event.service";
import { csrfProtection } from "../middleware/secure";
import { requireJWTAuth } from "../middleware/jwtAuth";

const router = Router();

router.post(
    "/",
    requireJWTAuth,
    csrfProtection,
    validateEvent,
    async (req: Request, res: Response) => {
        const {
            title,
            description,
            start_time,
            end_time,
            guests,
            is_public,
            notification_enabled,
            cancellation_policy,
        } = req.body;
        const user = req.user as User;

        try {
            const eventData = await createEvent(user, {
                title,
                description,
                start_time,
                end_time,
                guests,
                is_public,
                notification_enabled,
                cancellation_policy,
            });
            res.status(201).json(eventData);
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

router.get("/", requireJWTAuth, async (req: Request, res: Response) => {
    const user = req.user as User;

    try {
        const events = await getUserEvents(user.id);
        res.json(events);
    } catch (error) {
        res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred",
        });
    }
});

router.put(
    "/:id",
    requireJWTAuth,
    csrfProtection,
    async (req: Request, res: Response) => {
        const { title, description, start_time, end_time, guests } = req.body;
        const { id } = req.params;

        try {
            const updatedEvent = await updateEvent(Number(id), {
                title,
                description,
                start_time,
                end_time,
                guests,
            });
            res.json(updatedEvent);
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

router.delete(
    "/:id",
    requireJWTAuth,
    csrfProtection,
    async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const deletedEvent = await deleteEvent(Number(id));
            res.json({
                message: "Event successfully canceled",
                data: deletedEvent,
            });
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

export default router;
