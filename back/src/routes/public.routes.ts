// src/routes/public.routes.ts
// 1. External modules
import { Router, Request, Response } from "express";
import { supabase } from "../lib/supabaseClient";
import { User } from "../types/interface";
import { sendEmail } from "../mailer/mailer";

const router = Router();

// 📆 Public booking for a public event
router.post("/book/:slug", async (req: Request, res: Response) => {
    const { slug } = req.params;
    const { guest_name, guest_email, start_time, end_time, message } = req.body;

    try {
        // 1. 🎯 Retrieve the public event
        const { data: event, error: eventError } = await supabase
            .from("events")
            .select("*")
            .eq("slug", slug)
            .eq("is_public", true)
            .single();

        if (eventError || !event) {
            res.status(404).json({ message: "Event not found or not public" });
            return;
        }

        // 2. 🧠 Check availability
        const { data: conflicts, error: conflictError } = await supabase
            .from("event_bookings")
            .select("*")
            .eq("event_id", event.id)
            .or(`(start_time.lt.${end_time},end_time.gt.${start_time})`);

        if (conflictError) throw new Error(conflictError.message);

        if (conflicts && conflicts.length > 0) {
            res.status(409).json({ message: "This slot is already booked" });
            return;
        }

        // 3. 👤 Optional: get user_id if authenticated
        let userId: string | null = null;
        if (req.user) {
            const user = req.user as User;
            userId = user.id;
        }

        // 4. 📝 Create booking
        const { data: booking, error: bookingError } = await supabase
            .from("event_bookings")
            .insert([
                {
                    event_id: event.id,
                    user_id: userId,
                    guest_name,
                    guest_email,
                    start_time,
                    end_time,
                    message,
                    status: "booked",
                },
            ])
            .select()
            .single();

        if (bookingError) throw new Error(bookingError.message);

        // 5. ✉️ Send email to host
        if (event.user_id && event.title) {
            const { data: host } = await supabase
                .from("users")
                .select("email")
                .eq("id", event.user_id)
                .single();

            if (host?.email) {
                sendEmail(
                    host.email,
                    `⏰ Nouvelle réservation pour ${event.title}`,
                    `${guest_name} (${guest_email}) a réservé un créneau :\n\n${new Date(
                        start_time
                    ).toLocaleString()} → ${new Date(
                        end_time
                    ).toLocaleString()}`
                );
            }
        }

        // 6. ✉️ Send email to guest
        sendEmail(
            guest_email,
            `🎉 Confirmation de votre réservation`,
            `Bonjour ${guest_name},\n\nVotre créneau est bien réservé pour "${
                event.title
            }".\n\n🕒 ${new Date(start_time).toLocaleString()} → ${new Date(
                end_time
            ).toLocaleString()}`
        );

        res.status(201).json({
            success: true,
            message: "Booking confirmed",
            booking,
        });
        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Booking failed",
            error: (error as Error).message,
        });
        return;
    }
});

// 📚 Get event type details by slug (for public booking pages)
router.get("/book/:slug", async (req: Request, res: Response) => {
    const { slug } = req.params;

    try {
        const { data, error } = await supabase
            .from("events")
            .select("*")
            .eq("slug", slug)
            .eq("is_public", true)
            .single();

        if (error || !data) {
            res.status(404).json({
                success: false,
                message: "Event type not found",
            });
            return;
        }

        res.status(200).json({ success: true, event: data });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving event type",
            error: (error as Error).message,
        });
    }
});

export default router;
