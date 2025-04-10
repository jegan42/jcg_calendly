// src/routes/event.routes.ts
// 1. External modules and types
import { Router, Request, Response } from "express";
import { User } from "../types/interface";

// 2. Custom middleware & services
import { supabase } from "../lib/supabaseClient";
import { requireJWTAuth } from "../middleware/jwtAuth";
import {
    createEvent,
    getUserEvents,
    updateEvent,
    deleteEvent,
    validateEvent,
    getEventById,
    checkOverlappingEvents,
} from "../services/event.service";

const router = Router();

// 🔐 All routes in this file require authentication
router.use(requireJWTAuth);

// ✅ Create an event with validation
router.post("/", validateEvent, async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const event = await createEvent(user, req.body);

        res.status(201).json({ success: true, event });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while creating the event",
            error: (error as Error).message,
        });
    }
});

// 📅 Get all events for the authenticated user
router.get("/", async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const events = await getUserEvents(user.id);

        res.status(200).json({ success: true, events });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while retrieving events",
            error: (error as Error).message,
        });
    }
});

// 🔍 Get a specific event by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const eventId = parseInt(req.params.id, 10);

        const event = await getEventById(user.id, eventId);

        res.status(200).json({ success: true, event });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Event not found or inaccessible",
            error: (error as Error).message,
        });
    }
});

// 📝 Update an event
router.put("/:id", async (req: Request, res: Response) => {
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

        res.status(200).json({ success: true, event: updatedEvent });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while updating the event",
            error: (error as Error).message,
        });
    }
});

// ❌ Delete an event
router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedEvent = await deleteEvent(Number(id));
        res.status(200).json({
            success: true,
            message: "Event successfully deleted",
            data: deletedEvent,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while deleting the event",
            error: (error as Error).message,
        });
    }
});

// 📆 Check event availability (conflict with other events)
router.post("/check-availability", async (req: Request, res: Response) => {
    try {
        const { start_time, end_time } = req.body;
        const user = req.user as User;
        const isAvailable = await checkOverlappingEvents(
            user.id,
            new Date(start_time),
            new Date(end_time)
        );

        if (isAvailable.length > 0) {
            res.status(409).json({ message: "Time slot already booked" });
            return;
        }

        res.status(200).json({ available: isAvailable.length === 0 });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while checking availability",
            error: (error as Error).message,
        });
    }
});

// 📚 Get event type details by slug (for public booking pages)
// If want to make this route public, put it before the requireJWTAuth middleware
router.get("/book/:slug", async (req: Request, res: Response) => {
    const { slug } = req.params;

    try {
        const { data, error } = await supabase
            .from("event_types")
            .select("*")
            .eq("slug", slug)
            .single();

        if (error || !data) {
            res.status(404).json({ message: "Event type not found" });
            return;
        }

        res.status(200).json({ success: true, eventType: data });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error retrieving event type",
            error: (err as Error).message,
        });
    }
});

export default router;
