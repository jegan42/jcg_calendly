// src/routes/event.routes.ts
// 1. External modules and types
import { Router, Request, Response } from "express";
import { EventGuest, User } from "../types/interface";

// 2. Custom middleware & services
import { supabase } from "../lib/supabaseClient";
import {
    createEvent,
    getUserEvents,
    updateEvent,
    deleteEvent,
    validateEvent,
    getEventById,
    checkOverlappingEvents,
    addGuestToEvent,
    getEventGuests,
    updateGuestStatus,
} from "../services/event.service";
import { createEventInGoogleCalendar, getEventsFromGoogleCalendar } from "../services/googleCalendar.service";
import { sendEmail } from "../mailer/mailer";

const router = Router();

// ✅ Create an event with validation
router.post("/", async (req: Request, res: Response) => {
    console.log(" ✅ POST events/ ✅ Enter before try data received:", req.body);
    try {
        console.log(" ✅ POST events before create/ ✅ Event data received:", req.body);
        console.log(" ✅ POST events before create/ ✅ User data received:", req.user);
        const user = req.user as User;
        const event = await createEvent(user, req.body);

        console.log(" ✅ POST / events after create ✅ user:[", user, "]");
        console.log(" ✅ POST / events after create ✅ createEvent:[", event, "]");

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
    console.log(" ✅ GET / ✅ Event data received:", req.body);
    console.log(" ✅ GET / ✅ User data received:", req.user);
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

// ✅ Create an event with validation
router.post("/google-calendar", async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const { title, description, start_time, end_time, guests, timeZone } =
            req.body;

        const eventDetails = {
            title,
            description,
            start_time: new Date(start_time).toISOString(),
            end_time: new Date(end_time).toISOString(),
            guests,
            timeZone,
        };

        const calendarEvent = await createEventInGoogleCalendar(
            user.accessToken,
            eventDetails
        );

        res.status(201).json({
            success: true,
            message: "Event successfully created on Google Calendar",
            event: calendarEvent,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while creating the event on Google Calendar",
            error: (error as Error).message,
        });
    }
});

// 📅 Get events from Google Calendar
router.get("/google-calendar", async (req: Request, res: Response) => {
    console.log("👉 Hit /google-calendar");
    try {
        const user = req.user as User;
        console.log("👉 Hit /google-calendar", user);
        const events = await getEventsFromGoogleCalendar(user.accessToken);
        console.log("👉 passed /google-calendar", events);
        res.status(200).json({ success: true, events });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des événements Google",
            error: (error as Error).message,
        });
    }
});

// 📧 Add a guest to an event
router.post("/:eventId/guests", async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const { guestEmail } = req.body;

    try {
        const guest = await addGuestToEvent(eventId, guestEmail);

        sendEmail(
            guestEmail,
            "Invitation à l'événement",
            `Vous avez été invité à l'événement avec l'ID : ${eventId}.`
        );

        res.status(201).json({
            success: true,
            message: "Guest added successfully",
            guest,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while adding the guest",
            error: (error as Error).message,
        });
    }
});

// 📧 Get all guests of an event
router.get("/:eventId/guests", async (req: Request, res: Response) => {
    const { eventId } = req.params;

    try {
        const guests = await getEventGuests(eventId);
        res.status(200).json({ success: true, guests });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while fetching guests",
            error: (error as Error).message,
        });
    }
});

// ✅ Update guest status (accepted, declined, maybe)
router.put("/:eventId/guests/:guestId", async (req: Request, res: Response) => {
    const { guestId } = req.params;
    const { status } = req.body; // 'accepted', 'declined', 'maybe'

    try {
        const updatedGuest = await updateGuestStatus(guestId, status);

        if (!updatedGuest) {
            res.status(404).json({
                success: false,
                message: "Guest not found",
            });
            return;
        }

        // Optionally, send a confirmation email
        sendEmail(
            (updatedGuest as EventGuest).guest_email,
            "Mise à jour du statut de l'invité",
            `Votre réponse pour l'événement a été mise à jour : ${status}.`
        );

        res.status(200).json({
            success: true,
            message: "Guest status updated successfully",
            updatedGuest,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while updating guest status",
            error: (error as Error).message,
        });
    }
});

// ❌ DELETE an event guest
router.delete(
    "/:eventId/guests/:guestId",
    async (req: Request, res: Response) => {
        const { eventId, guestId } = req.params;
        try {
            const { data, error } = await supabase
                .from("event_guests")
                .delete()
                .eq("event_id", eventId)
                .eq("id", guestId);

            if (error) throw new Error(error.message);

            res.status(200).json({
                success: true,
                message: "Guest successfully deleted",
                deleted: data,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Error while deleting the guest",
                error: (error as Error).message,
            });
        }
    }
);

// Route to handle guest responses (acceptance, decline, etc.)
router.get("/response", async (req: Request, res: Response) => {
    const { eventId, guestEmail, response } = req.query;

    try {
        if (!eventId || !guestEmail || !response) {
            res.status(400).json({
                success: false,
                message: "Missing required parameters",
            });
            return;
        }

        // Check if the guest exists for this event
        const { data: guest, error: guestError } = await supabase
            .from("event_guests")
            .select("*")
            .eq("event_id", eventId)
            .eq("guest_email", guestEmail)
            .single();

        if (guestError || !guest) {
            res.status(404).json({
                success: false,
                message: "Guest not found",
            });
            return;
        }

        // Update the guest's status
        let status: string;
        if (response === "accept") {
            status = "accepted";
        } else if (response === "decline") {
            status = "declined";
        } else {
            status = "maybe";
        }

        const { data, error } = await supabase
            .from("event_guests")
            .update({ status })
            .eq("id", guest.id);

        if (error) {
            res.status(500).json({
                success: false,
                message: "Error updating guest response",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Response updated successfully",
            data: data,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

export default router;
