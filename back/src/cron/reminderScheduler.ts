// src/cron/reminderScheduler.ts

// 1. 📦 External modules and types
import cron from "node-cron";
import { supabase } from "../lib/supabaseClient";
import { sendEmail } from "../mailer/mailer";

// 2. 📁 Internal types
// 🎯 Event type as returned by Supabase
interface Event {
    id: number;
    title: string;
    start_time: string; // ISO format
    user_email: string | null;
    guests: string[]; // list of emails
}

// 3. ⏱️ CRON task scheduling
export const scheduleEventReminders = () => {
    cron.schedule("* * * * *", async () => {
        const now = new Date();
        const reminderWindows = getReminderWindows(now);

        for (const timeWindow of reminderWindows) {
            const events = await fetchEventsForWindow(timeWindow);

            if (events.length > 0) {
                sendReminders(events, timeWindow);
            }
        }
    });
};

// 4. 🪟 Generates reminder windows (in 1h and in 24h)
const getReminderWindows = (now: Date): Date[] => {
    const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return [inOneHour, in24Hours];
};

// 5. 🔍 Fetches events starting ±1 min around each window
const fetchEventsForWindow = async (timeWindow: Date): Promise<Event[]> => {
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
        console.error("❌ Supabase error:", error.message);
        return [];
    }

    return data as Event[];
};

// 6. 📤 Sends reminder emails to guests + organizer
const sendReminders = (events: Event[], timeWindow: Date) => {
    const iso = timeWindow.toISOString();

    for (const event of events) {
        const message = constructReminderMessage(event);

        if (event.guests && event.guests.length > 0) {
            event.guests.forEach((guestEmail) => {
                sendEmail(guestEmail, "🔔 Rappel d'événement", message);
            });
        }

        if (event.user_email) {
            sendEmail(event.user_email, "🔔 Rappel d'événement", message);
        }
    }

    console.log(`✅ ${events.length} reminder(s) sent at ${iso}`);
};

// 7. ✍️ Constructs the personalized reminder message
const constructReminderMessage = (event: Event): string => {
    const startTimeFormatted = new Date(event.start_time).toLocaleString(
        "fr-FR",
        {
            dateStyle: "full",
            timeStyle: "short",
        }
    );

    return `⏰ Rappel : votre événement "${event.title}" commence le ${startTimeFormatted}.`;
};
