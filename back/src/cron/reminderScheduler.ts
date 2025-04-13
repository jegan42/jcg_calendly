// src/cron/reminderScheduler.ts
// 1. 📦 External modules and types
import cron from "node-cron";
import { supabase } from "../lib/supabaseClient";
import { sendEmail } from "../mailer/mailer";
import { EventType } from "../types/interface";
import { getUserById } from "../lib/supabaseQueries";

// 2. ⏱️ CRON task scheduling
export const scheduleEventReminders = () => {
    cron.schedule("0 9 * * *", async () => {
        const now = new Date();
        const reminderWindows = getReminderWindows(now);

        for (const timeWindow of reminderWindows) {
            const events = await fetchEventsForWindow(timeWindow);

            if (events.length > 0) {
                sendReminders(events, timeWindow);
                sendGuestReminders(events);
            }
        }
    });
};

// 3. 🪟 Generates reminder windows (in 1h and in 24h)
const getReminderWindows = (now: Date): Date[] => {
    const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return [inOneHour, in24Hours];
};

// 4. 🔍 Fetches events starting ±1 min around each window
const fetchEventsForWindow = async (timeWindow: Date): Promise<EventType[]> => {
    const iso = timeWindow.toISOString();
    const oneMinuteBefore = new Date(
        timeWindow.getTime() - 60 * 1000
    ).toISOString();

    const { data, error } = await supabase
        .from("events")
        .select("*")
        .lte("start_time", iso)
        .gte("start_time", oneMinuteBefore);

    if (error) {
        throw new Error(`❌ Supabase error: ${error.message}`);
    }

    return data as EventType[];
};

// 5. 📤 Sends reminder emails to guests + organizer
const sendReminders = async (events: EventType[], timeWindow: Date) => {
    const iso = timeWindow.toISOString();

    for (const event of events) {
        const message = constructReminderMessage(event);

        if (event.guests && event.guests.length > 0) {
            for (const guestEmail of event.guests) {
                sendEmail(guestEmail, "🔔 Rappel d'événement", message);
            }
        }

        const user = await getUserById(event.user_id);

        if (!user) {
            console.error("❌ Error fetching user: User not found");
            return;
        }

        if (user.email) {
            sendEmail(user.email, "🔔 Rappel d'événement", message);
        }
    }

    console.log(`✅ ${events.length} reminder(s) sent at ${iso}`);
};

// 6. ✍️ Constructs the personalized reminder message
const constructReminderMessage = (event: EventType): string => {
    if (!event.start_time || !event.title) {
        console.error("❌ Missing information for the event", event);
        return "";
    }
    const startTimeFormatted = new Date(event.start_time).toLocaleString(
        "fr-FR",
        {
            dateStyle: "full",
            timeStyle: "short",
        }
    );

    return `⏰ Rappel : votre événement "${event.title}" commence le ${startTimeFormatted}.`;
};

// 7. ✉️ Send reminders to guests who haven't responded (status = 'invited' or 'maybe')
const sendGuestReminders = async (events: EventType[]) => {
    for (const event of events) {
        const { data: guests, error } = await supabase
            .from("event_guests")
            .select("*")
            .eq("event_id", event.id)
            .in("status", ["invited", "maybe"]); // Vérifie les invités qui n'ont pas répondu

        if (error) {
            console.error("❌ Error fetching guests:", error.message);
            continue;
        }

        for (const guest of guests) {
            const reminderMessage = `Vous n'avez pas encore répondu à l'invitation de l'événement "${event.title}". Veuillez répondre afin que nous puissions préparer au mieux l'événement.`;

            sendEmail(
                guest.guest_email,
                "🔔 Rappel : Répondez à l'invitation",
                reminderMessage
            );
        }

        console.log(
            `✅ Reminder sent to ${guests.length} guests for event "${event.title}".`
        );
    }
};
