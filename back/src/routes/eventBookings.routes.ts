// src/routes/eventBookings.routes.ts

// 1. External modules and types
import { Router, Request, Response } from "express";
import { supabase } from "../lib/supabaseClient";

const router = Router();

// ✅ Create a new booking
router.post("/", async (req: Request, res: Response) => {
    const { event_id, user_id, start_time, end_time } = req.body;

    try {
        const { data: overlapping, error: overlapError } = await supabase
            .from("event_bookings")
            .select("*")
            .eq("event_id", event_id)
            .or(`(start_time.lt.${end_time},end_time.gt.${start_time})`);

        if (overlapError) throw new Error(overlapError.message);
        if (overlapping.length > 0) {
            res.status(409).json({
                success: false,
                message: "This time slot is already booked.",
            });
            return;
        }

        const { data, error } = await supabase.from("event_bookings").insert([
            {
                event_id,
                user_id,
                start_time,
                end_time,
                status: "booked",
            },
        ]);

        if (error) throw new Error(error.message);

        res.status(201).json({ success: true, booking: data });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while creating the booking",
            error: (error as Error).message,
        });
    }
});

// 📋 Get all bookings for a specific event
router.get("/:eventId", async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;

        const { data, error } = await supabase
            .from("event_bookings")
            .select("*")
            .eq("event_id", eventId);

        if (error) throw new Error(error.message);

        res.status(200).json({ success: true, bookings: data });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching bookings",
            error: (error as Error).message,
        });
    }
});

// 🗑 Delete a booking by ID
router.delete("/:bookingId", async (req: Request, res: Response) => {
    try {
        const { bookingId } = req.params;

        const { data, error } = await supabase
            .from("event_bookings")
            .delete()
            .eq("id", bookingId);

        if (error) throw new Error(error.message);

        res.status(200).json({
            success: true,
            message: "Booking deleted",
            deleted: data,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error deleting booking",
            error: (error as Error).message,
        });
    }
});

// ✏️ Update booking status (ex: confirmed, cancelled, etc.)
router.put("/:bookingId", async (req: Request, res: Response) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;

        const { data, error } = await supabase
            .from("event_bookings")
            .update({ status })
            .eq("id", bookingId);

        if (error) throw new Error(error.message);

        res.status(200).json({
            success: true,
            message: "Booking updated",
            updated: data,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error updating booking",
            error: (error as Error).message,
        });
    }
});

// 📅 Get all bookings for a specific user
router.get("/user/:userId", async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const { data, error } = await supabase
            .from("event_bookings")
            .select("*")
            .eq("user_id", userId);

        if (error) throw new Error(error.message);

        res.status(200).json({ success: true, bookings: data });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while fetching bookings",
            error: (error as Error).message,
        });
    }
});

export default router;
