// src/supabase/functions/fnSupabase/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import { parse } from "@bearz/dotenv";

// Load and parse environment variables from a file or a string
const envContent = await Deno.readTextFile("./.env"); // You can also load a string directly
const env = parse(envContent);

const supabaseUrl = env.SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
        "Supabase URL or Service Key is not defined in environment variables."
    );
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
