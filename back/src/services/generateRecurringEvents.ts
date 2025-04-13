// src/services/generateRecurringEvents.ts
// 1. External modules and utilities
import { supabase } from "../lib/supabaseClient";
import { addDays, addWeeks, addMonths, isBefore } from "date-fns";

// 2. Function to generate recurring events
export const generateRecurringInstances = async () => {
    // 🔄 Retrieve all recurring event templates from the database
    const { data: templates, error } = await supabase
        .from("recurring_events")
        .select("*");

    if (error) {
        console.error("Error fetching recurring events:", error.message);
        return;
    }

    // date now if need it
    // const now = new Date();
    const limitDate = new Date();
    limitDate.setMonth(limitDate.getMonth() + 1); // Generate events up to 1 month ahead

    // Loop through each recurring event template
    for (const template of templates) {
        const {
            _id,
            user_id,
            title,
            description,
            start_time,
            end_time,
            frequency,
            interval = 1,
            guests,
        } = template;

        // Initialize start and end time for the next occurrence
        let nextStart = new Date(start_time);
        let nextEnd = new Date(end_time);
        const instances = [];

        // Generate events until we reach the limit date
        while (isBefore(nextStart, limitDate)) {
            const { data: existingEvent } = await supabase
                .from("events")
                .select("*")
                .eq("user_id", user_id)
                .eq("start_time", nextStart.toISOString())
                .single();

            if (existingEvent) {
                console.log("Event already exists:", title, nextStart);
                continue;
            }
            // Prepare an instance of the recurring event
            instances.push({
                user_id,
                title,
                description,
                start_time: nextStart.toISOString(),
                end_time: nextEnd.toISOString(),
                is_public: true,
                notification_enabled: true,
                cancellation_policy: false,
                guests,
                recurrence_type: frequency,
            });

            // Increment the event date based on the frequency
            switch (frequency) {
                case "daily":
                    nextStart = addDays(nextStart, interval);
                    nextEnd = addDays(nextEnd, interval);
                    break;
                case "weekly":
                    nextStart = addWeeks(nextStart, interval);
                    nextEnd = addWeeks(nextEnd, interval);
                    break;
                case "monthly":
                    nextStart = addMonths(nextStart, interval);
                    nextEnd = addMonths(nextEnd, interval);
                    break;
                default:
                    console.warn(
                        `Unsupported recurrence frequency: ${frequency}`
                    );
                    break;
            }
        }

        if (instances.length > 0) {
            // Insert events in batches to improve performance
            let batchSize = 100;
            while (instances.length > 0) {
                const batch = instances.splice(0, batchSize);
                await supabase.from("events").upsert(batch);
            }

            console.log(`Generated ${instances.length} events for: ${title}`);
        }

        // Insert the generated event instances into the database
        const { error: insertError } = await supabase
            .from("events")
            .insert(instances);

        if (insertError) {
            console.error(
                "Error inserting recurring events:",
                insertError.message
            );
        } else {
            console.log(
                `✅ Generated ${instances.length} events for: ${title}`
            );
        }
    }
};
