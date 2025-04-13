// src/cron/recurringInstances.ts
// 1. External modules for scheduling
import cron from "node-cron";
import { generateRecurringInstances } from "../services/generateRecurringEvents";

// 2. Schedule recurring events generation
cron.schedule("0 0 * * *", async () => {
    console.log("🔁 Generating recurring events...");
    await generateRecurringInstances();
});
