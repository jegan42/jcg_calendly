// src/routes/availability.routes.ts
// 1. External modules and types
import { Router, Request, Response } from "express";
import { supabase } from "../lib/supabaseClient";
import { User } from "../types/interface";

const router = Router();

// 📅 Get all availability slots for the authenticated user
router.get("/", async (req: Request, res: Response) => {
    try {
        const user = req.user as User;

        const { data, error } = await supabase
            .from("availability")
            .select("*")
            .eq("user_id", user.id);

        if (error) throw new Error(error.message);

        res.status(200).json({ success: true, availability: data });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while fetching availabilities",
            error: (error as Error).message,
        });
    }
});

// ✅ Add a new availability slot
router.post("/", async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const { day_of_week, start_time, end_time } = req.body;

        const { data, error } = await supabase.from("availability").insert([
            {
                user_id: user.id,
                day_of_week,
                start_time,
                end_time,
            },
        ]);

        if (error) throw new Error(error.message);

        res.status(201).json({ success: true, availability: data });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while adding availability",
            error: (error as Error).message,
        });
    }
});

// 📝 Update an availability slot
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { day_of_week, start_time, end_time } = req.body;

        const { data, error } = await supabase
            .from("availability")
            .update({ day_of_week, start_time, end_time })
            .eq("id", id);

        if (error) throw new Error(error.message);

        res.status(200).json({ success: true, updated: data });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while updating availability",
            error: (error as Error).message,
        });
    }
});

// 🚀 Create/update availability for a user
router.post("/:userId", async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { start_time, end_time } = req.body;

    try {
        const { data, error } = await supabase
            .from("availability")
            .upsert([{ user_id: userId, start_time, end_time }]);
        if (error) {
            throw new Error(error.message);
        }
        res.status(201).json({ success: true, data });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error while creating/updating availability",
            error: (err as Error).message,
        });
    }
});

// ❌ Delete an availability slot
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("availability")
            .delete()
            .eq("id", id);

        if (error) throw new Error(error.message);

        res.status(200).json({
            success: true,
            message: "Availability slot deleted",
            deleted: data,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error while deleting availability",
            error: (error as Error).message,
        });
    }
});

export default router;
