// src/routes/recurringEvents.routes.ts

// 1. External modules and types
import { Router, Request, Response } from "express";
import { supabase } from "../lib/supabaseClient";
import { User } from "../types/interface";

const router = Router();

// ✅ Create a recurring event
router.post("/", async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const {
            title,
            description,
            start_time,
            end_time,
            frequency, // daily / weekly / monthly
            interval,
        } = req.body;

        const { data, error } = await supabase.from("recurring_events").insert([
            {
                user_id: user.id,
                title,
                description,
                start_time,
                end_time,
                frequency,
                interval,
            },
        ]);

        if (error) throw new Error(error.message);

        res.status(201).json({ success: true, event: data });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while creating the recurring event",
            error: (error as Error).message,
        });
    }
});

// 📅 Get all recurring events
router.get("/", async (req: Request, res: Response) => {
    try {
        const user = req.user as User;

        const { data, error } = await supabase
            .from("recurring_events")
            .select("*")
            .eq("user_id", user.id);

        if (error) throw new Error(error.message);

        res.status(200).json({ success: true, events: data });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while fetching recurring events",
            error: (error as Error).message,
        });
    }
});

// 🔍 Get a single recurring event by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const { id } = req.params;

        const { data, error } = await supabase
            .from("recurring_events")
            .select("*")
            .eq("user_id", user.id)
            .eq("id", id)
            .single();

        if (error || !data) {
            res.status(404).json({
                success: false,
                message: "Recurring event not found",
            });
            return;
        }

        res.status(200).json({ success: true, event: data });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while retrieving the recurring event",
            error: (error as Error).message,
        });
    }
});

// ✏️ Update a recurring event
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            start_time,
            end_time,
            frequency,
            interval,
        } = req.body;

        const { data, error } = await supabase
            .from("recurring_events")
            .update({
                title,
                description,
                start_time,
                end_time,
                frequency,
                interval,
            })
            .eq("id", id);

        if (error) throw new Error(error.message);

        res.status(200).json({ success: true, updated: data });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while updating the recurring event",
            error: (error as Error).message,
        });
    }
});

// ❌ Delete a recurring event
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("recurring_events")
            .delete()
            .eq("id", id);

        if (error) throw new Error(error.message);

        res.status(200).json({
            success: true,
            message: "Recurring event deleted successfully",
            deleted: data,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while deleting the recurring event",
            error: (error as Error).message,
        });
    }
});

// ⚙️ Generate event instances from recurring pattern
router.post("/generate/:id", async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const { id } = req.params;

        const { data: recurringEvent, error: fetchError } = await supabase
            .from("recurring_events")
            .select("*")
            .eq("user_id", user.id)
            .eq("id", id)
            .single();

        if (fetchError || !recurringEvent) {
            res.status(404).json({
                success: false,
                message: "Recurring event template not found",
            });
            return;
        }

        const {
            title,
            description,
            start_time,
            end_time,
            frequency,
            interval,
        } = recurringEvent;

        const eventsToInsert = [];
        const maxOccurrences = 10; // Limit to 10 occurrences for this example
        let currentStart = new Date(start_time);
        let currentEnd = new Date(end_time);

        for (let i = 0; i < maxOccurrences; i++) {
            eventsToInsert.push({
                user_id: user.id,
                title,
                description,
                start_time: new Date(currentStart),
                end_time: new Date(currentEnd),
                is_public: true,
                notification_enabled: true,
                cancellation_policy: false,
                guests: [],
            });

            switch (frequency) {
                case "daily":
                    currentStart.setDate(currentStart.getDate() + interval);
                    currentEnd.setDate(currentEnd.getDate() + interval);
                    break;
                case "weekly":
                    currentStart.setDate(currentStart.getDate() + 7 * interval);
                    currentEnd.setDate(currentEnd.getDate() + 7 * interval);
                    break;
                case "monthly":
                    currentStart.setMonth(currentStart.getMonth() + interval);
                    currentEnd.setMonth(currentEnd.getMonth() + interval);
                    break;
            }
        }

        const { error: insertError } = await supabase
            .from("events")
            .insert(eventsToInsert);

        if (insertError) throw new Error(insertError.message);

        res.status(201).json({
            success: true,
            message: `✅ ${eventsToInsert.length} events successfully generated`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error during event generation",
            error: (error as Error).message,
        });
    }
});

export default router;
