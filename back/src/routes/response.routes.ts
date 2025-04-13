// back/src/routes/response.routes.ts
import { Router, Request, Response } from "express";
import { supabase } from "../lib/supabaseClient";

const router = Router();

// 🌐 public route - update a guest's response to an event
router.post("/", async (req: Request, res: Response) => {
    const { eventId, guestEmail, status } = req.body;

    const validStatuses = ["accepted", "declined", "maybe"];
    if (!validStatuses.includes(status)) {
        res.status(400).json({ error: "Invalid status value" });
        return;
    }

    if (!eventId || !guestEmail || !status) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    try {
        const { data, error } = await supabase
            .from("event_guests")
            .update({ status })
            .eq("event_id", eventId)
            .eq("guest_email", guestEmail);

        if (error) {
            throw new Error(error.message);
        }

        res.status(200).json({
            message: "Response updated successfully",
            data,
        });
        return;
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
        return;
    }
});

export default router;
